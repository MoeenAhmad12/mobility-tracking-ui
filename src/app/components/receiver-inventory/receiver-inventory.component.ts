import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
export class ReceiverInventoryComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['Model','Imei','Tracking_Number','Post_Code','Vendor_Price'];
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

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
        this.dataSource.data= response.data.rows.map(function(x:any) {
          return {    
            "Model": x[0],
            "Item_Id": x[1],
            "Vendor_Price": x[2],
            "Imei": x[3],
            "Receiver_Id": x[4],
            "Receiver_Shipment_Id": x[5],
            "Vendor_Received": x[6], 
            "Post_Code": x[7], 
            "Tracking_Number": x[8], 
          }
        })
      },
      error => {
        this.toastr.error("Error in getting supplier parcel", "Supplier Parcel")
      }
    );
  }
}
