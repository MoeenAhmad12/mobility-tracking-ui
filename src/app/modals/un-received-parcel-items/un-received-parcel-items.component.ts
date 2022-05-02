import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import { ReceiveParcelComponent } from '../receive-parcel/receive-parcel.component';

@Component({
  selector: 'app-un-received-parcel-items',
  templateUrl: './un-received-parcel-items.component.html',
  styleUrls: ['./un-received-parcel-items.component.css']
})
export class UnReceivedParcelItemsComponent implements OnInit,AfterViewInit {

  displayedColumns = ['Model', 'Price', 'Received_At','Actions'];
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
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {id: string}) { 
      this.parcelId = data.id
      
    }

  ngOnInit(): void {
    this.getParcelItems()
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  receiveParcelItems(id:string) {
    const dialogRef=this.dialog.open(ReceiveParcelComponent,{
      height: '300px',
      width: '400px',
      data: { id: id },
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.getParcelItems();
    });
  }

  getParcelItems(){
    this.dataService.getParcelItems(this.parcelId).subscribe(
      response => {
        this.dataSource.data= response.data.rows.map(function(x:any) {
          return {    
            "Model": x[0],
            "Price": x[1],
            "Id": x[2],
            "Is_Paid": x[3]==0? false:true,
            "Paid_At": x[4],
            "Received_At": x[5] == null? false:x[5]
          }
        })
      },
      error => {
      }
    );
  }


}
