import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
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
      },
      error => {
        this.toastr.error("Error in creating receiver", "Receiver")
      }
    );
  }


}
