import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ParcelItemModel } from 'src/app/models/parcel-item-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-parcel-item-modal',
  templateUrl: './parcel-item-modal.component.html',
  styleUrls: ['./parcel-item-modal.component.css']
})
export class ParcelItemModalComponent implements OnInit ,OnChanges{
  @Input() parcelId = '';
  id:string = '';
  isEditMode:boolean=false;
  parcelItems: ParcelItemModel[]=[];
  parcelItemForm= this.formBuilder.group({
    model: ['', Validators.required],
    price: ['', Validators.required]
  });
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService) { }
  ngOnChanges() {
    this.getParcelItems();
  }

  ngOnInit(): void {
  }

  editItem(item:ParcelItemModel){
    this.isEditMode = true;
    this.parcelItemForm.patchValue({
      price:item.Price,
      model:item.Model
    })
    this.id = item.Id;
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
          this.parcelItemForm.reset()
          this.getParcelItems();
        },
        error => {
          this.toastr.error("Error in creating parcel item", "Parcel Item")
        }
      );
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
        this.parcelItemForm.reset()
        this.getParcelItems();
      },
      error => {
        this.toastr.error("Error in creating parcel item", "Parcel Item")
      }
    );
  }
  getParcelItems(){
    if(this.parcelId != ''){
      this.dataService.getParcelItems(this.parcelId).subscribe(
        response => {
          this.parcelItems= response.data.rows.map(function(x:any) {
            return {    
              "Model": x[0],
              "Price": x[1],
              "Id": x[2],
              "Parcel_Id": x[3],
              "Is_Received": x[4],
              "Is_Paid": x[5],
              "Created_At": x[6],
              "Paid_At": x[7]
            }
          })
          console.log(this.parcelItems)
        },
        error => {
        }
      );
    }
  }
}
