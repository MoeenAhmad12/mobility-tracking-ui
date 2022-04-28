import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
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
  userId:string=''
  userType:string=''
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: {type:string,id: string}) { 
      this.userId = data.id
      this.userType = data.type
      console.log(data)
    }
  ngOnInit(): void {
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
