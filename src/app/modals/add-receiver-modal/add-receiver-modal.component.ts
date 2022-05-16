import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-receiver-modal',
  templateUrl: './add-receiver-modal.component.html',
  styleUrls: ['./add-receiver-modal.component.css']
})
export class AddReceiverModalComponent implements OnInit {
  receiverForm= this.formBuilder.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
  });
  validPhone= false;
  id:string='';
  isEditMode = false;
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<AddReceiverModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {row: any}) { 
      if(data.row){
        this.isEditMode = true;
        this.receiverForm.patchValue({
          name:data.row.Name,
          phone:data.row.Phone
        })
        this.id = data.row.Id
      }
      else{
        this.isEditMode = false;
      }
    }

  ngOnInit(): void {
    this.onChanges()
  }
  onChanges() {
    this.receiverForm.valueChanges.subscribe(form => {
      if(form.phone.startsWith("0")){
        this.validPhone = true
      }
      else{
        this.validPhone = false
      }
    });
  }
  updateReceiver(){
    const payload={
      "Name":  this.receiverForm.value.name,
      "Phone":  this.receiverForm.value.phone,
      "Id": this.id
    }
    this.dataService.updateReceiver(payload).subscribe(
      response => {
        this.toastr.success(response.message, "Receiver")
        this.receiverForm.reset();
        this.dialogRef.close();
      },
      error => {
        this.toastr.error("Error in creating receiver", "Receiver")
      }
    );
  }
  addReceiver(){
    const payload={
      "Name":  this.receiverForm.value.name,
      "Phone":  this.receiverForm.value.phone,
    }
    this.dataService.createReceiver(payload).subscribe(
      response => {
        this.toastr.success(response.message, "Receiver")
        this.receiverForm.reset();
        this.dialogRef.close();
      },
      error => {
        this.toastr.error("Error in creating receiver", "Receiver")
      }
    );
  }


}
