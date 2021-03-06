import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/models/user-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-vendor-unpaid-items',
  templateUrl: './vendor-unpaid-items.component.html',
  styleUrls: ['./vendor-unpaid-items.component.css']
})
export class VendorUnpaidItemsComponent implements OnInit, AfterViewInit {
  
  @Output() itemPaid: EventEmitter<any> = new EventEmitter();
  vendors: UserModel[] = [];
  displayedColumns = ['Vendor_Price', 'Imei', 'Actions'];
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
  constructor(
    private dataService: DataService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getVendors()
    this.getVendorUnPaidItem()
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  vendorChanged(val:any){
    this.vendorId= val.value.Id
    this.getVendorUnPaidItem()
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
  getVendorUnPaidItem(){
    this.dataService.getVendorUnPaidItem(this.vendorId).subscribe(
      response => {
        this.dataSource.data= response.data.rows.map(function(x:any) {
          return {   
            "Model": x[0], 
            "Parcel_Item_Id": x[1], 
            "Vendor_Price": x[2], 
            "Is_Sent": x[3], 
            "Imei":x[4], 
            "Vendor_Paid_At": x[5],
            "Receiver_Shipment_Id": x[6]
          }
        })
      },
      error => {
      }
    );
  }
  markVendorPaidItem(id:string){
    this.dataService.MarkVendorPaidItem(id).subscribe(
      response => {
        this.toastr.success(response.message, "Vendor Item")
        this.getVendorUnPaidItem();
        this.itemPaid.emit();
      },
      error => {
        this.toastr.error("Error in paying Parcel", "Parcel")
      }
    );
  }
  
}
