import { AfterViewInit, Component, Inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ParcelItemModel } from 'src/app/models/parcel-item-model';
import { DataService } from 'src/app/services/data.service';
import { AddParcelItemModalComponent } from '../add-parcel-item-modal/add-parcel-item-modal.component';
import { UpdateParcelItemModalComponent } from '../update-parcel-item-modal/update-parcel-item-modal.component';

@Component({
  selector: 'app-parcel-item-modal',
  templateUrl: './parcel-item-modal.component.html',
  styleUrls: ['./parcel-item-modal.component.css']
})
export class ParcelItemModalComponent implements OnInit,AfterViewInit {
  
  
  displayedColumns = ['Model', 'Price','Actions'];
  exampleDatabase: any
  
  dataSource = new MatTableDataSource();
  index: number =0;
  parcelId: string= '';


  @ViewChild(MatPaginator, {static: true}) paginator: any;
  @ViewChild(MatSort, {static: true}) sort: any;
  @ViewChild('filter',  {static: true}) filter: any;
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
    private toastr: ToastrService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {id: string}) { 
      this.parcelId = data.id
    }
  ngOnInit(): void {
    this.getParcelItems();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  addParcelItem(row?:any) {
    const dialogRef=this.dialog.open(UpdateParcelItemModalComponent,{
      height: '330px',
      width: '400px',
      data:{id:this.parcelId,row:row}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getParcelItems();
    });
  }

  editItem(item:ParcelItemModel){
    this.isEditMode = true;
    this.parcelItemForm.patchValue({
      price:item.Price,
      model:item.Model
    })
    this.id = item.Id;
  }
  getParcelItems(){
    if(this.parcelId != ''){
      this.dataService.getParcelItems(this.parcelId).subscribe(
        response => {
          this.dataSource.data= response.data.rows.map(function(x:any) {
            return {    
              "Model": x[0],
              "Price": x[1],
              "Id": x[2],
              "Is_Paid": x[3],
              "Paid_At": x[4],
              "Received_At": x[5] == null? false : x[5]
            }
          })
        },
        error => {
        }
      );
    }
  }
}
