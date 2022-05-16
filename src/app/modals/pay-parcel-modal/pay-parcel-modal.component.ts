import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-pay-parcel-modal',
  templateUrl: './pay-parcel-modal.component.html',
  styleUrls: ['./pay-parcel-modal.component.css']
})
export class PayParcelModalComponent implements OnInit {
  parcelForm= this.formBuilder.group({
    price: ['', Validators.required]
  });
  payMode = false;
  parcelId:string=''
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<PayParcelModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id?: string;mode?:boolean}) { 
      if(data.mode){
        this.payMode =true;
      }
      else{
        this.payMode =false;
      }
      if(data.id){
        this.parcelId = data.id
      }
    }
  ngOnInit(): void {
  }
  
  payParcel(){
    if(this.payMode){
      this.dialogRef.close(this.parcelForm.value.price);
    }
    else{
      const payload={
        "Parcel_Id": this.parcelId,
        "Parcel_Price":this.parcelForm.value.price
      }
      this.dataService.updateIsEnteredAndParcelPrice(payload).subscribe(
        response => {
          this.toastr.success(response.message, "Parcel")
          this.dialogRef.close();
        },
        error => {
          this.toastr.error("Error in paying Parcel", "Parcel")
        }
      );
    }
  }

}
