import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterLinkWithHref } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-parcel-item-modal',
  templateUrl: './add-parcel-item-modal.component.html',
  styleUrls: ['./add-parcel-item-modal.component.css']
})
export class AddParcelItemModalComponent implements OnInit {
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
    private  dialogRef: MatDialogRef<AddParcelItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id:string,row: any}) { 
      if(data.row){
        this.parcelItemForm.patchValue({
          model:data.row.Model,
          price:data.row.Price
        })
        this.id = data.row.Id
        this.parcelId = data.id
      }
    }

  ngOnInit(): void {
  }

  itemChanged(val:any){
    
    this.dialogRef.close(val);
  }
  
  createParcelItem(){
    const payload={
      "Model":  this.parcelItemForm.value.model,
      "Price":  this.parcelItemForm.value.price,
    }
    this.dialogRef.close(payload);
  }
}
