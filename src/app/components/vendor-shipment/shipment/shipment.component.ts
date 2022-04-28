import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AddShipmentModalComponent } from 'src/app/modals/add-shipment-modal/add-shipment-modal.component';
import { UserModel } from 'src/app/models/user-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css']
})
export class ShipmentComponent implements OnInit {

  receivers: UserModel[] = [];
  displayedColumns = ['Tracking_Number', 'Created_At', 'Actions'];
  exampleDatabase: any
  dataSource = new MatTableDataSource();
  receiverId:string = ''

  config = {
    displayKey:"Name", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Select Receiver', // text to be displayed when no item is selected defaults to Select,
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
  constructor(
    private dialog: MatDialog,
    private dataService: DataService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getVendorShipments()
    this.getReceivers()
  }
  receiverChanged(val:any){
    this.receiverId= val.value.Id
    this.getVendorShipments()
  }
  getReceivers(){
    this.dataService.getReceivers().subscribe(
      response => {
        this.receivers= response.data.rows.map(function(x:any) {
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

  addShipment() {
    const dialogRef=this.dialog.open(AddShipmentModalComponent,{
      height: '620px',
      width: '700px',
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  
  getVendorShipments(){
    this.dataService.getVendorShipments(this.receiverId).subscribe(
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
          }
        })
      },
      error => {
        this.toastr.error("Error in getting supplier parcel", "Supplier Parcel")
      }
    );
  }
}
