import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/models/user-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-balance',
  templateUrl: './user-balance.component.html',
  styleUrls: ['./user-balance.component.css']
})
export class UserBalanceComponent implements OnInit,AfterViewInit {

  constructor(
    private dataService: DataService,
    private toastr: ToastrService,) { }
  receivers: UserModel[] = [];
  vendors: UserModel[] = [];
  suppliers: UserModel[] = [];
  users: UserModel[] = [];
  userId:string = ''
  types: any []= [{type:"Vendor"},{type:'Supplier'},{type:'Receiver'}]
  config = {
    displayKey:"type", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Select Type', // text to be displayed when no item is selected defaults to Select,
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Search', // label thats displayed in search input,
    searchOnKey: 'type' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  }
  userConfig = {
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

  
  displayedColumns: string[] = ['Name','Type', 'Balance'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: any;
  ngOnInit(): void {
    this.getVendors();
    this.getReceivers();
    this.getSuppliers();
    this.getUserBalance();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  changeType(val:any){
    if(val.value.type=="Vendor"){
      this.users = this.vendors
    }
    else if(val.value.type==="Supplier"){
      this.users = this.suppliers
    }
    else if(val.value.type==="Receiver"){
      this.users = this.receivers
    }
  }
  changeUser(val:any){
    this.userId = val.value.Id;
    this.getUserBalance()
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getUserBalance(){
    this.dataService.getUserBalance(this.userId).subscribe(
      response => {
        this.dataSource.data= response.data.rows.map(function(x:any) {
          return {    
              "User_Id": x[0],
              "Name": x[1],
              "Type": x[2],
              "Balance": x[3]
          }
        })
      },
      error => {
        this.toastr.error("Error in getting vendor", "Vendor")
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
              "Phone": x[2],
              "Address": x[3]
          }
        })
      },
      error => {
        this.toastr.error("Error in getting vendor", "Vendor")
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
              "Phone": x[2],
              "Address": x[3]
          }
        })
      },
      error => {
      }
    );
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

}
