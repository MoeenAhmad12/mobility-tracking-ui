import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import { UnReceivedParcelItemsComponent } from 'src/app/modals/un-received-parcel-items/un-received-parcel-items.component';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-un-received-parcels',
  templateUrl: './un-received-parcels.component.html',
  styleUrls: ['./un-received-parcels.component.css']
})
export class UnReceivedParcelsComponent implements OnInit {
  
  displayedColumns: string[] = ['Tracking_Number','Post_Code','Parcel_Date','Supplier_Name', 'Receiver_Name','Actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: any;


  @ViewChild(MatPaginator, {static: true}) paginator: any;
  @ViewChild('filter',  {static: true}) filter: any;
  constructor(private dialog: MatDialog,
    
    private dataService: DataService,
    private toastr: ToastrService,) {}

  openDialog() {
    this.dialog.open(UnReceivedParcelItemsComponent,{
      height: '600px',
      width: '1000px',
    });
  }
  ngOnInit(): void {
    this.getUnReceivedParcels()
  }
  
  getUnReceivedParcels(){
    this.dataService.getUnReceivedParcels().subscribe(
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
