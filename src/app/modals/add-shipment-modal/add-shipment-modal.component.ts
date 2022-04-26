import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/models/user-model';
import { DataService } from 'src/app/services/data.service';
import { AddInventoryItemModalComponent } from '../add-inventory-item-modal/add-inventory-item-modal.component';

@Component({
  selector: 'app-add-shipment-modal',
  templateUrl: './add-shipment-modal.component.html',
  styleUrls: ['./add-shipment-modal.component.css']
})
export class AddShipmentModalComponent implements OnInit {
  vendors: UserModel[] = [];
  receivers: UserModel[] = [];
  shipmentItems:any[]=[];
  vendorId:string='';
  receiverId:string='';
  shipmentForm= this.formBuilder.group({
    trackingNumber: ['', Validators.required]
  });
  
  displayedColumns = ['Model', 'Imei','Vendor_Price','Actions'];
  dataSource = new MatTableDataSource();
  config = {
    displayKey:"Name", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Select', // text to be displayed when no item is selected defaults to Select,
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Search', // label thats displayed in search input,
    searchOnKey: 'Name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  }
  
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService,
    private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getReceivers()
    this.getVendors()
  }
  addShipment() {
    const dialogRef=this.dialog.open(AddInventoryItemModalComponent,{
      height: '400px',
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.shipmentItems.push(result.value);
      this.dataSource.data = this.shipmentItems;
    });
  }
  vendorChanged(val:any){
    this.vendorId= val.value.Id;
  }
  receiverChanged(val:any){
      this.receiverId= val.value.Id
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

  getVendors(){
    this.dataService.getVendors().subscribe(
      response => {
        this.vendors= response.data.rows.map(function(x:any) {
          return {    
            "Id": x[0],
            "Name": x[1],
            "Address": x[2],
            "Phone": x[3]
          }
        })
      },
      error => {
      }
    );
  }
  
  createShipment(){
    var item = this.shipmentItems.map(x=>x.Item_Id)
    const payload={
      "Tracking_Number":  this.shipmentForm.value.trackingNumber,
      "Vendor_Id":  this.vendorId,
      "Receiver_Id":  this.receiverId,
      "Items": item
    }
    this.dataService.createShipment(payload).subscribe(
      response => {
        this.toastr.success(response.message, "Shipment")
        this.shipmentForm.reset()
      },
      error => {
        this.toastr.error("Error in creating shipment", "Shipment")
      }
    );
  }

}
