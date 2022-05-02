import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-update-parcel-item-modal',
  templateUrl: './update-parcel-item-modal.component.html',
  styleUrls: ['./update-parcel-item-modal.component.css']
})
export class UpdateParcelItemModalComponent implements OnInit {

  parcelItemForm= this.formBuilder.group({
    model: ['', Validators.required],
    price: ['', Validators.required]
  });
  isEditCheck:boolean = false;
  parcelId:string=''
  id:string=''
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<UpdateParcelItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id:string,row: any}) { 
      if(data.row){
        this.isEditCheck = true
        this.parcelItemForm.patchValue({
          model:data.row.Model,
          price:data.row.Price
        })
        this.id = data.row.Id
        this.parcelId = data.id
      }
      else{
        this.isEditCheck = false
        this.parcelId = data.id
      }
    }

  ngOnInit(): void {
  }
  
updateParcelItem(){
  const payload={
    "Model":  this.parcelItemForm.value.model,
    "Price":  this.parcelItemForm.value.price,
    "Parcel_Id":  this.parcelId,
    "Id": this.id
  }
  this.dataService.updateParcelItem(payload).subscribe(
    response => {
      this.toastr.success(response.message, "Parcel Item")
      this.isEditCheck = false;
      this.parcelItemForm.reset()
      this.dialogRef.close();
    },
    error => {
      this.toastr.error("Error in creating parcel item", "Parcel Item")
    }
  );
}
createParcelItem(){
  const payload={
    "Model":  this.parcelItemForm.value.model,
    "Price":  this.parcelItemForm.value.price,
    "Parcel_Id":  this.parcelId
  }
  this.dataService.createParcelItem(payload).subscribe(
    response => {
      this.toastr.success(response.message, "Parcel Item")
      this.parcelItemForm.reset();
      this.dialogRef.close();
    },
    error => {
      this.toastr.error("Error in creating parcel item", "Parcel Item")
    }
  );
}

}
