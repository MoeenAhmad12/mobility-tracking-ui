import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UnPaidParcelItemsComponent } from 'src/app/modals/un-paid-parcel-items/un-paid-parcel-items.component';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-un-paid-parcels',
  templateUrl: './un-paid-parcels.component.html',
  styleUrls: ['./un-paid-parcels.component.css']
})
export class UnPaidParcelsComponent implements OnInit {

  
  displayedColumns = ['Tracking_Number', 'Post_Code', 'Date',  'Actions'];
  exampleDatabase: any
  dataSource = new MatTableDataSource();
  index: number =0;
  id: number=0;


  @ViewChild(MatPaginator, {static: true}) paginator: any;
  @ViewChild(MatSort, {static: true}) sort: any;
  @ViewChild('filter',  {static: true}) filter: any;
  constructor(private dialog: MatDialog,
    private dataService: DataService,
    private toastr: ToastrService) {}

  openDialog(id:string) {
    this.dialog.open(UnPaidParcelItemsComponent,{
      height: '600px',
      width: '1000px',
      data: { id: id },
    });
  }
  ngOnInit(): void {
    this.getReceiverUnPaidParcels();
  }
  
  payParcel(id:string){
    this.dataService.markParcelPaid(id).subscribe(
      response => {
        this.toastr.success(response.message, "Parcel")
      },
      error => {
        this.toastr.error("Error in paying Parcel", "Parcel")
      }
    );
  }

  getReceiverUnPaidParcels(){
    this.dataService.getReceiverUnPaidParcels().subscribe(
      response => {
        this.dataSource.data= response.data.rows.map(function(x:any) {
          return {    
            "Id": x[0],
            "Tracking_Number": x[1],
            "Post_Code": x[2],
            "Created_At": x[3],
            "Date": x[4],
            "Supplier_Id": x[5],
            "Receiver_Id": x[6],
            "Is_Empty": x[7],
            "Receiver_Paid": x[8],
            "Received": x[9],
            "Received_At": x[10],
            "Paid_At": x[11]
          }
        })
      },
      error => {
        this.toastr.error("Error in getting supplier parcel", "Supplier Parcel")
      }
    );
  }

}
