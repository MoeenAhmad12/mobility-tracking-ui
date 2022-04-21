import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-supplier-modal',
  templateUrl: './add-supplier-modal.component.html',
  styleUrls: ['./add-supplier-modal.component.css']
})
export class AddSupplierModalComponent implements OnInit {
  supplierForm= this.formBuilder.group({
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

  addSupplier(){
    const payload={
      "Name":  this.supplierForm.value.name,
      "Phone":  this.supplierForm.value.phone,
      "Address":  this.supplierForm.value.address,
    }
    this.dataService.createSupplier(payload).subscribe(
      response => {
        this.toastr.success(response.message, "Supplier")
        this.supplierForm.reset()
      },
      error => {
        this.toastr.error("Error in creating receiver", "Receiver")
      }
    );
  }

}
