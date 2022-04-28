import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { PayUserComponent } from 'src/app/modals/pay-user/pay-user.component';
import { UserModel } from 'src/app/models/user-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-transactions',
  templateUrl: './user-transactions.component.html',
  styleUrls: ['./user-transactions.component.css']
})
export class UserTransactionsComponent implements OnInit {
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
    placeholder:'Select User', // text to be displayed when no item is selected defaults to Select,
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Search', // label thats displayed in search input,
    searchOnKey: 'Name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  }
  
  displayedColumns: string[] = ['Transaction_Type', 'Amount','Balance', 'User_type'];
  dataSource = new MatTableDataSource();

  receivers: UserModel[] = [];
  vendors: UserModel[] = [];
  suppliers: UserModel[] = [];
  users: UserModel[] = [];
  userType : string=''
  userId: string = ''
  @ViewChild(MatSort) sort: any;
  constructor(
    private dataService: DataService,
    private toastr: ToastrService,private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getUserTransactions()
    this.getVendors();
    this.getReceivers();
    this.getSuppliers();
  }
  receiveParcel() {
    this.dialog.open(PayUserComponent,{
      height: '300px',
      width: '400px',
      data: { type:this.userType,id: this.userId },
    });
  }
  changeUser(val:any){
    this.userId = val.value.Id;
    this.getUserTransactions()
  }
  changeType(val:any){
    this.userType = val.value.type;
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
  getUserTransactions(){
    this.dataService.getUserTransactions(this.userId).subscribe(
      response => {
        this.dataSource.data= response.data.rows.map(function(x:any) {
          return {    
              "Id": x[0],
              "User_Id": x[1],
              "DateTime": x[2],
              "Transaction_Type": x[3],
              "Amount": x[4], 
              "Balance": x[5], 
              "Item_Id": x[6], 
              "User_type": x[7] 
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
