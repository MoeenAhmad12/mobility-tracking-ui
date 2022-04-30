import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UnReceivedParcelItemsComponent } from 'src/app/modals/un-received-parcel-items/un-received-parcel-items.component';
import { UserModel } from 'src/app/models/user-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-receiver-inventory',
  templateUrl: './receiver-inventory.component.html',
  styleUrls: ['./receiver-inventory.component.css']
})
export class ReceiverInventoryComponent implements OnInit {

  displayedColumns: string[] = ['Model','Imei','Vendor_Price'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: any;

  receivers: UserModel[] = [];
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
  @ViewChild('filter',  {static: true}) filter: any;
  receiverId:string = ''
  constructor(
    private dataService: DataService,
    private toastr: ToastrService,private dialog: MatDialog,) { }
  ngOnInit(): void {
    this.getReceiverInventory();
    this.getReceivers()
  }
  receiverChanged(val:any){
    this.receiverId= val.value.Id
    this.getReceiverInventory()
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

  getReceiverInventory(){
    this.dataService.getReceiverInventory(this.receiverId).subscribe(
      response => {
        const items= response.data.rows.map(function(x:any) {
          return {    
            "Item_Id": x[0],
            "Model": x[1],
            "Imei": x[2],
            "Vendor_Price": x[3],
            "Is_Sent": x[4],
            "Vendor_Received": x[5],
            "Vendor_Paid": x[6], 
            "Receiver_Id": x[7], 
            "Receiver_Shipment_Id": x[8], 
            "Vendor_Paid_At": x[9]
          }
        })
        this.dataSource.data = items.filter((x: { Is_Sent: number; }) => x.Is_Sent == 0)
      
      },
      error => {
        this.toastr.error("Error in getting supplier parcel", "Supplier Parcel")
      }
    );
  }
}
