import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    address: ['']
  });
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService) { }

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


}
