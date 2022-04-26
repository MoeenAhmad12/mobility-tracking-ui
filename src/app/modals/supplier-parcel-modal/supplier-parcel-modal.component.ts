import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ParcelItemModel } from 'src/app/models/parcel-item-model';
import { UserModel } from 'src/app/models/user-model';
import { DataService } from 'src/app/services/data.service';
import { AddParcelItemModalComponent } from '../add-parcel-item-modal/add-parcel-item-modal.component';

@Component({
  selector: 'app-supplier-parcel-modal',
  templateUrl: './supplier-parcel-modal.component.html',
  styleUrls: ['./supplier-parcel-modal.component.css']
})
export class SupplierParcelModalComponent implements OnInit {
  suppliers: UserModel[] = [];
  receivers: UserModel[] = [];
  supplierId:string='';
  receiverId:string='';
  
  displayedColumns = ['Model', 'Price','Actions'];
  dataSource = new MatTableDataSource();
  parcelId: string= '';


  @ViewChild(MatPaginator, {static: true}) paginator: any;
  @ViewChild(MatSort, {static: true}) sort: any;
  @ViewChild('filter',  {static: true}) filter: any;
  
  suppliesParcelForm= this.formBuilder.group({
    trackingNumber: ['', Validators.required],
    postCode: ['', Validators.required]
  });
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
    this.getReceivers();
    this.getSuppliers();
  }
  supplierChanged(val:any){
    console.log(val)
    this.supplierId= val.value.Id;
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

  getSuppliers(){
    this.dataService.getSuppliers().subscribe(
      response => {
        this.suppliers= response.data.rows.map(function(x:any) {
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
  
  createSupplierParcel(){
    const payload={
      "Tracking_Number":  this.suppliesParcelForm.value.trackingNumber,
      "Post_Code":  this.suppliesParcelForm.value.postCode,
      "Supplier_Id":  this.supplierId,
      "Receiver_Id":  this.receiverId,
      "Date":"10-10-2010"
    }
    this.dataService.createSupplierParcel(payload).subscribe(
      response => {
        this.toastr.success(response.message, "Supplier Parcel")
        this.suppliesParcelForm.reset()
      },
      error => {
        this.toastr.error("Error in creating supplier parcel", "Supplier Parcel")
      }
    );
  }
  addParcelItem(row?:any) {
    const dialogRef=this.dialog.open(AddParcelItemModalComponent,{
      height: '330px',
      width: '400px',
      data:{id:this.parcelId,row:row}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getParcelItems();
    });
  }
  getParcelItems(){
    if(this.parcelId != ''){
      this.dataService.getParcelItems(this.parcelId).subscribe(
        response => {
          this.dataSource.data= response.data.rows.map(function(x:any) {
            return {    
              "Model": x[0],
              "Price": x[1],
              "Id": x[2],
              "Is_Paid": x[3],
              "Paid_At": x[4],
              "Received_At": x[5] == null? false : x[5]
            }
          })
        },
        error => {
        }
      );
    }
  }

}
