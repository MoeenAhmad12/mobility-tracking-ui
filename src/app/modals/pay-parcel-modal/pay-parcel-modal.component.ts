import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  parcelId:string=''
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: {id: string}) { 
      this.parcelId = data.id}
  ngOnInit(): void {
  }
  
  payParcel(){
    const payload={
      "Parcel_Id": this.parcelId,
      "Parcel_Price":this.parcelForm.value.price
    }
    this.dataService.updateIsEnteredAndParcelPrice(payload).subscribe(
      response => {
        this.toastr.success(response.message, "Parcel")
      },
      error => {
        this.toastr.error("Error in paying Parcel", "Parcel")
      }
    );
  }

}
