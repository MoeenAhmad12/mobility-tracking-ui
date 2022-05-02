import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-receive-parcel',
  templateUrl: './receive-parcel.component.html',
  styleUrls: ['./receive-parcel.component.css']
})
export class ReceiveParcelComponent implements OnInit {
  parcelForm= this.formBuilder.group({
    imei: ['', Validators.required]
  });
  parcelId:string=''
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<ReceiveParcelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: string}) { 
      this.parcelId = data.id}
  ngOnInit(): void {
  }
  
  receiveParcelItem(){
    const payload={
      "Id": this.parcelId,
      "Imei":this.parcelForm.value.imei
    }
    this.dataService.markParcelItemReceived(payload).subscribe(
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
