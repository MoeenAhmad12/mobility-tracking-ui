import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import { UnReceivedParcelItemsComponent } from 'src/app/modals/un-received-parcel-items/un-received-parcel-items.component';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { ReceiveParcelComponent } from 'src/app/modals/receive-parcel/receive-parcel.component';
@Component({
  selector: 'app-un-received-parcels',
  templateUrl: './un-received-parcels.component.html',
  styleUrls: ['./un-received-parcels.component.css']
})
export class UnReceivedParcelsComponent implements OnInit {
  
  displayedColumns: string[] = ['Tracking_Number','Post_Code','Parcel_Date','Supplier_Name', 'Receiver_Name','Actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: any;
  @Output() parcelReceived: EventEmitter<any> = new EventEmitter();


  @ViewChild(MatPaginator, {static: true}) paginator: any;
  @ViewChild('filter',  {static: true}) filter: any;
  constructor(private dialog: MatDialog,
    
    private dataService: DataService,
    private toastr: ToastrService,) {}
  ngOnInit(): void {
    this.getUnReceivedParcels()
  }

  receiveParcel(id:string) {
    this.dialog.open(ReceiveParcelComponent,{
      height: '300px',
      width: '400px',
      data: { id: id },
    });
  }

  receiveParcelItem(id:string){
    const payload={
      "Id": id
    }
    this.dataService.markParcelReceived(payload).subscribe(
      response => {
        this.toastr.success(response.message, "Parcel")
        console.log("called")
        this.parcelReceived.emit();
        this.getUnReceivedParcels()
      },
      error => {
        this.toastr.error("Error in paying Parcel", "Parcel")
      }
    );
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
