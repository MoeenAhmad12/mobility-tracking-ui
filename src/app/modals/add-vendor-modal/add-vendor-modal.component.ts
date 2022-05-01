import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-vendor-modal',
  templateUrl: './add-vendor-modal.component.html',
  styleUrls: ['./add-vendor-modal.component.css']
})
export class AddVendorModalComponent implements OnInit {
  vendorForm= this.formBuilder.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    address: ['', Validators.required]
  });
  isEditMode = false;
  id:string = '';
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: {row: any}) {
      if(data.row){
        this.isEditMode = true;
        this.vendorForm.patchValue({
          name:data.row.Name,
          phone:data.row.Phone,
          address:data.row.Address,
        })
        this.id = data.row.Id
      }
      else{
        this.isEditMode = false;
      }
     }

  ngOnInit(): void {
  }
  
  addVendor(){
    const payload={
      "Name":  this.vendorForm.value.name,
      "Phone":  this.vendorForm.value.phone,
      "Address":  this.vendorForm.value.address,
    }
    this.dataService.createVendor(payload).subscribe(
      response => {
        this.toastr.success(response.message, "Vendor")
        this.vendorForm.reset();
      },
      error => {
        this.toastr.error("Error in creating vendor", "Vendor")
      }
    );
  }
  updateVendor(){
    const payload={
      "Name":  this.vendorForm.value.name,
      "Phone":  this.vendorForm.value.phone,
      "Address":  this.vendorForm.value.address,
      "Id": this.id
    }
    this.dataService.updateVendor(payload).subscribe(
      response => {
        this.toastr.success(response.message, "Vendor")
        this.vendorForm.reset();
      },
      error => {
        this.toastr.error("Error in creating receiver", "Receiver")
      }
    );
  }

}
