import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-vendor-receive-item-modal',
  templateUrl: './vendor-receive-item-modal.component.html',
  styleUrls: ['./vendor-receive-item-modal.component.css']
})
export class VendorReceiveItemModalComponent implements OnInit {

  vendorReceiveItemForm= this.formBuilder.group({
    vendorPrice: ['', Validators.required]
  });
  Id:string=''
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: {id: string}) { 
      this.Id = data.id}
  ngOnInit(): void {
  }
  
  receiveItem(){

    const payload={
      "Item_Id": this.Id,
      "Vendor_Price":this.vendorReceiveItemForm.value.vendorPrice
    }
    this.dataService.vendorReceiveItem(payload).subscribe(
      response => {
        this.toastr.success(response.message, "Parcel")
      },
      error => {
        this.toastr.error("Error in paying Parcel", "Parcel")
      }
    );
  }

}
