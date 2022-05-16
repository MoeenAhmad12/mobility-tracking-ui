import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import { UnReceivedParcelItemsComponent } from 'src/app/modals/un-received-parcel-items/un-received-parcel-items.component';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { ReceiveParcelComponent } from 'src/app/modals/receive-parcel/receive-parcel.component';
import { SelectionModel } from '@angular/cdk/collections';
@Component({
  selector: 'app-un-received-parcels',
  templateUrl: './un-received-parcels.component.html',
  styleUrls: ['./un-received-parcels.component.css']
})
export class UnReceivedParcelsComponent implements OnInit, AfterViewInit {
  
  displayedColumns: string[] = ['Tracking_Number','Post_Code','Parcel_Date','Supplier_Name', 'Receiver_Name','Actions'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<any>(true, []);
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
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  receiveSelected(){
    console.log( this.selection)
   }
   isAllSelected() {
     const numSelected = this.selection.selected.length;
     const numRows = this.dataSource.data.length;
     return numSelected === numRows;
   }
 
   /** Selects all rows if they are not all selected; otherwise clear selection. */
   masterToggle() {
     if (this.isAllSelected()) {
       this.selection.clear();
       return;
     }
 
     this.selection.select(...this.dataSource.data);
   }
 
   checkboxLabel(row?: any): string {
     if (!row) {
       return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
     }
     return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
   }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
        this.getUnReceivedParcels();
        this.dialog.open(UnReceivedParcelItemsComponent,{
          height: '600px',
          width: '1000px',
          data: { id: id },
        });
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
