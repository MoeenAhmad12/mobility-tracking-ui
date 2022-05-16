import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UnReceivedParcelItemsComponent } from 'src/app/modals/un-received-parcel-items/un-received-parcel-items.component';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-received-parcels',
  templateUrl: './received-parcels.component.html',
  styleUrls: ['./received-parcels.component.css']
})
export class ReceivedParcelsComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['Tracking_Number','Post_Code','Parcel_Date','Supplier_Name', 'Receiver_Name','Actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: any;



  @ViewChild(MatPaginator, {static: true}) paginator: any;
  @ViewChild('filter',  {static: true}) filter: any;
  constructor(
    private dataService: DataService,
    private toastr: ToastrService,private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getReceivedParcels();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  viewParcelItems(id:string) {
    this.dialog.open(UnReceivedParcelItemsComponent,{
      height: '600px',
      width: '1000px',
      data: { id: id },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
