import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-received-parcels',
  templateUrl: './received-parcels.component.html',
  styleUrls: ['./received-parcels.component.css']
})
export class ReceivedParcelsComponent implements OnInit {

  displayedColumns: string[] = ['Tracking_Number','Post_Code','Parcel_Date','Supplier_Name', 'Receiver_Name','Actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: any;



  @ViewChild(MatPaginator, {static: true}) paginator: any;
  @ViewChild('filter',  {static: true}) filter: any;
  constructor(
    private dataService: DataService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getReceivedParcels();
  }
  
  getReceivedParcels(){
    this.dataService.getReceivedParcels().subscribe(
      response => {
        this.dataSource.data= response.data.rows.map(function(x:any) {
          return {    
            "Supplier_Name": x[0],
            "Receiver_Name": x[1],
            "Parcel_Date": x[2],
            "Tracking_Number": x[3],
            "Post_Code": x[4],
            "Id": x[5],
          }
        })
      },
      error => {
        this.toastr.error("Error in getting supplier parcel", "Supplier Parcel")
      }
    );
  }


}
