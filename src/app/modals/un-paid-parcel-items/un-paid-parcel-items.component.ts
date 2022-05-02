import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-un-paid-parcel-items',
  templateUrl: './un-paid-parcel-items.component.html',
  styleUrls: ['./un-paid-parcel-items.component.css']
})
export class UnPaidParcelItemsComponent implements OnInit ,AfterViewInit{

  displayedColumns = ['Model', 'Price','Received_At', 'Paid_At','Actions'];
  exampleDatabase: any
  
  dataSource = new MatTableDataSource();
  index: number =0;
  parcelId: string= '';


  @ViewChild(MatPaginator, {static: true}) paginator: any;
  @ViewChild(MatSort, {static: true}) sort: any;
  @ViewChild('filter',  {static: true}) filter: any;
  constructor(
    private dataService: DataService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: {id: string}) { 
      this.parcelId = data.id
    }
  ngOnInit(): void {
    this.getParcelItems()
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  payItem(id:string){
    this.dataService.markParcelItemPaid(id).subscribe(
      response => {
        this.toastr.success(response.message, "Parcel")
        this.getParcelItems();
      },
      error => {
        this.toastr.error("Error in paying Parcel Item", "Parcel Item")
      }
    );
  }
  getParcelItems(){
    this.dataService.getParcelItems(this.parcelId).subscribe(
      response => {
        this.dataSource.data= response.data.rows.map(function(x:any) {
          return {    
            "Model": x[0],
            "Price": x[1],
            "Id": x[2],
            "Is_Paid": x[3],
            "Paid_At": x[4],
            "Received_At": x[5]
          }
        })
      },
      error => {
      }
    );
  }


}
