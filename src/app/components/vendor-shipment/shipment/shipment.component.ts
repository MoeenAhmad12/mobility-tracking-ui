import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AddShipmentModalComponent } from 'src/app/modals/add-shipment-modal/add-shipment-modal.component';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css']
})
export class ShipmentComponent implements OnInit {

  displayedColumns = ['Tracking_Number', 'Created_At', 'Actions'];
  exampleDatabase: any
  dataSource = new MatTableDataSource();
  index: number =0;
  id: number=0;


  @ViewChild(MatPaginator, {static: true}) paginator: any;
  @ViewChild(MatSort, {static: true}) sort: any;
  @ViewChild('filter',  {static: true}) filter: any;
  constructor(
    private dialog: MatDialog,
    private dataService: DataService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getVendorShipments()
  }

  addShipment() {
    const dialogRef=this.dialog.open(AddShipmentModalComponent,{
      height: '620px',
      width: '700px',
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  
  getVendorShipments(){
    this.dataService.getVendorShipments().subscribe(
      response => {
        this.dataSource.data= response.data.rows.map(function(x:any) {
          return {    
            "Id": x[0],
            "Vendor_Id": x[1],
            "Receiver_Id": x[2],
            "Received_At": x[3],
            "Is_Received": x[4],
            "Created_At": x[5],
            "Tracking_Number": x[6],
          }
        })
      },
      error => {
        this.toastr.error("Error in getting supplier parcel", "Supplier Parcel")
      }
    );
  }
}
