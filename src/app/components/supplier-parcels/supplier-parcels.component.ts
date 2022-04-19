import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ParcelItemModel } from 'src/app/models/parcel-item-model';
import { SuppliesParcelModel } from 'src/app/models/supplier-parcel-model';
import { UserModel } from 'src/app/models/user-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-supplier-parcels',
  templateUrl: './supplier-parcels.component.html',
  styleUrls: ['./supplier-parcels.component.css']
})
export class SupplierParcelsComponent implements OnInit, AfterViewInit {

  @ViewChild('parcelItemModal') private parcelItemModal:any;
  supplierParcels:SuppliesParcelModel[]=[]
  parcelItems: ParcelItemModel[]=[];
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
  parcelId: string ='';
  parcelItemForm= this.formBuilder.group({
    model: ['', Validators.required],
    price: ['', Validators.required]
  });
  displayedColumns: string[] = ['Tracking_Number','Post_Code','Parcel_Date','Supplier_Name', 'Receiver_Name','Actions'];
  dataSource = new MatTableDataSource(this.supplierParcels);
  @ViewChild(MatSort) sort: any;


  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService,
    private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
    this.getSupplierParcels();
  }
  viewItem(row:any){
    this.parcelId = row.Id;
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createParcelItem(){
    const payload={
      "Model":  this.parcelItemForm.value.model,
      "Price":  this.parcelItemForm.value.price,
      "Parcel_Id":  this.parcelId
    }
    this.dataService.createParcelItem(payload).subscribe(
      response => {
        this.toastr.success(response.message, "Parcel Item")
        this.parcelItemForm.reset()
        this.viewParcel(this.parcelId);
      },
      error => {
        this.toastr.error("Error in creating parcel item", "Parcel Item")
      }
    );
  }
  viewParcel(id:string){
    this.parcelId = id;
    this.dataService.getParcelItems(id).subscribe(
      response => {
        this.parcelItems= response.data.rows.map(function(x:any) {
          return {    
            "Model": x[0],
            "Price": x[1],
            "Id": x[2],
            "Parcel_Id": x[3],
            "Is_Received": x[4],
            "Is_Paid": x[5],
            "Created_At": x[6],
            "Paid_At": x[7]
          }
        })
        console.log(this.parcelItems)
      },
      error => {
      }
    );
  }
  getSupplierParcels(){
    this.dataService.getSupplierParcels().subscribe(
      response => {
        this.supplierParcels= response.data.rows.map(function(x:any) {
          return {    
            "Supplier_Name": x[0],
            "Receiver_Name": x[1],
            "Parcel_Date": x[2],
            "Tracking_Number": x[3],
            "Post_Code": x[4],
            "Id": x[5],
          }
        })
        this.dataSource.data=this.supplierParcels;
      },
      error => {
        this.toastr.error("Error in getting supplier parcel", "Supplier Parcel")
      }
    );
  }

}
