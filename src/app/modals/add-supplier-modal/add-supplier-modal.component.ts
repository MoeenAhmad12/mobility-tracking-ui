import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    address: ['', Validators.required]
  });
  isEditMode =false;
  id:string = '';
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<AddSupplierModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {row: any}) {
      if(data.row){
        this.isEditMode = true;
        this.supplierForm.patchValue({
          name:data.row.Name,
          phone:data.row.Phone,
          address:data.row.Address,
        })
        this.id =data.row.Id;
      }
      else{
        this.isEditMode = false;
      }
     }

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
        this.supplierForm.reset();
        this.dialogRef.close();
      },
      error => {
        this.toastr.error("Error in creating receiver", "Receiver")
      }
    );
  }
  updateSupplier(){
    const payload={
      "Name":  this.supplierForm.value.name,
      "Phone":  this.supplierForm.value.phone,
      "Address":  this.supplierForm.value.address,
      "Id": this.id
    }
    this.dataService.updateSupplier(payload).subscribe(
      response => {
        this.toastr.success(response.message, "Receiver")
        this.supplierForm.reset();
        this.dialogRef.close();
      },
      error => {
        this.toastr.error("Error in creating receiver", "Receiver")
      }
    );
  }

}
