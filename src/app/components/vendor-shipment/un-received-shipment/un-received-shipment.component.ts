import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UnReceivedShipmentItemsComponent } from 'src/app/modals/un-received-shipment-items/un-received-shipment-items.component';
import { UserModel } from 'src/app/models/user-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-un-received-shipment',
  templateUrl: './un-received-shipment.component.html',
  styleUrls: ['./un-received-shipment.component.css']
})
export class UnReceivedShipmentComponent implements OnInit {

  @Output() shipmentReceived: EventEmitter<any> = new EventEmitter();
  vendors: UserModel[] = [];
  displayedColumns = ['Tracking_Number', 'Post_Code','Actions'];
  dataSource =  new MatTableDataSource();
  vendorId:string='';
  config = {
    displayKey:"Name", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Select Vendor', // text to be displayed when no item is selected defaults to Select,
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Search', // label thats displayed in search input,
    searchOnKey: 'Name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  }

  @ViewChild(MatPaginator, {static: true}) paginator: any;
  @ViewChild(MatSort, {static: true}) sort: any;
  @ViewChild('filter',  {static: true}) filter: any;
  constructor(private dialog: MatDialog,
    private dataService: DataService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUnReceivedShipments()
    this.getVendors()
  }
  vendorChanged(val:any){
    this.vendorId= val.value.Id
    this.getUnReceivedShipments()
  }
  receiveShipment(row:any){
    this.dataService.vendorReceiveShipment(row.Id).subscribe(
      response => {
        this.toastr.success(response.message, "Shipment")
        this.getUnReceivedShipments();
        this.shipmentReceived.emit();
        this.dialog.open(UnReceivedShipmentItemsComponent,{
          height: '600px',
          width: '1000px',
          data: { id: row.Id },
        });
      },
      error => {
      }
    );
  }
  getVendors(){
    this.dataService.getVendors().subscribe(
      response => {
        this.vendors= response.data.rows.map(function(x:any) {
          return {    
            "Id": x[0],
            "Name": x[1],
            "Phone": x[2]
          }
        })
      },
      error => {
      }
    );
  }
  getUnReceivedShipments(){
    this.dataService.getVendorUnReceivedShipment(this.vendorId).subscribe(
      response => {
        this.dataSource.data= response.data.rows.map(function(x:any) {
          return {   
            "Id": x[0], 
            "Vendor_Id": x[1], 
            "Receiver_Id": x[2], 
            "Received_At": x[3], 
            "Is_Received": x[4], 
            "Created_At": x[5], 
            "Tracking_Number": x[6],
            "Post_Code": x[7], 
          }
        })
      },
      error => {
      }
    );
  }

}
