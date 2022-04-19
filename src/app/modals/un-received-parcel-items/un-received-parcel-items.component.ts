import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-un-received-parcel-items',
  templateUrl: './un-received-parcel-items.component.html',
  styleUrls: ['./un-received-parcel-items.component.css']
})
export class UnReceivedParcelItemsComponent implements OnInit {

  displayedColumns = ['Model', 'Price', 'Actions'];
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
  }
  getParcelItems(){
    this.dataService.getParcelItems(this.parcelId).subscribe(
      response => {
        this.dataSource.data= response.data.rows.map(function(x:any) {
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
      },
      error => {
      }
    );
  }


}
