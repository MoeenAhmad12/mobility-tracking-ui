import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/models/user-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-pay-user',
  templateUrl: './pay-user.component.html',
  styleUrls: ['./pay-user.component.css']
})
export class PayUserComponent implements OnInit {
  payUserForm= this.formBuilder.group({
    amount: ['', Validators.required]
  });
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
  receivers: UserModel[] = [];
  vendors: UserModel[] = [];
  suppliers: UserModel[] = [];
  users: UserModel[] = [];
  userId:string=''
  userType:string=''
  typeCheck=false;
  userCheck = false;
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService) { 
    }
  ngOnInit(): void {
    this.getVendors();
    this.getReceivers();
    this.getSuppliers();
  }

  changeUser(val:any){
    this.userId = val.value.Id;
    if(!this.userId || this.userId == ''){
      this.userCheck = false;
    }
    else {
      this.userCheck = true;
    }
  }

  changeType(val:any){
    this.userType=val.value.type
    if(!this.userType || this.userType == ''){
      this.typeCheck = false;
    }
    else{
      this.typeCheck = true;
    }
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

  
  payAmount(){
    const payload={
      "User_Id": this.userId,
      "Amount_Paid":this.payUserForm.value.amount
    }
    if(this.userType=="Vendor"){
      this.dataService.vendorPay(payload).subscribe(
      response => {
        this.toastr.success(response.message, "Pay")
      },
      error => {
        this.toastr.error("Error in paying ", "Pay")
      }
    );
    }
    else if(this.userType=="Supplier"){
      this.dataService.supplierPay(payload).subscribe(
      response => {
        this.toastr.success(response.message, "Pay")
      },
      error => {
        this.toastr.error("Error in paying ", "Pay")
      }
    );
    }
    else if(this.userType=="Receiver"){
      this.dataService.receiverPay(payload).subscribe(
        response => {
          this.toastr.success(response.message, "Pay")
        },
        error => {
          this.toastr.error("Error in paying ", "Pay")
        }
      );
    }
    
  }

}
