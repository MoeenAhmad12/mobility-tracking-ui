import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/models/user-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-set-price-parcels',
  templateUrl: './set-price-parcels.component.html',
  styleUrls: ['./set-price-parcels.component.css']
})
export class SetPriceParcelsComponent implements OnInit {

  receivers: UserModel[] = [];
  displayedColumns = ['Tracking_Number', 'Post_Code', 'Parcel_Price'];
  dataSource =  new MatTableDataSource();
  vendorId:string='';
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
    private dataService: DataService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getReceivers()
  }
  receiverChanged(val:any){
    this.vendorId= val.value.Id
    this.getPaidReceiverParcels()
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
  getPaidReceiverParcels(){
    this.dataService.getPaidReceiverParcels(this.vendorId).subscribe(
      response => {
        this.dataSource.data= response.data.rows.map(function(x:any) {
          return {   
            "Id": x[0], 
            "Tracking_Number": x[1], 
            "Post_Code": x[2], 
            "Parcel_Price": x[3], 
          }
        })
      },
      error => {
      }
    );
  }

}
