import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ParcelItemModel } from 'src/app/models/parcel-item-model';
import { DataService } from 'src/app/services/data.service';
import { VendorReceiveItemModalComponent } from '../vendor-receive-item-modal/vendor-receive-item-modal.component';

@Component({
  selector: 'app-un-received-shipment-items',
  templateUrl: './un-received-shipment-items.component.html',
  styleUrls: ['./un-received-shipment-items.component.css']
})
export class UnReceivedShipmentItemsComponent implements OnInit,AfterViewInit {

  displayedColumns = ['Model','Tracking_Number','Imei',  'Actions'];
  exampleDatabase: any
  dataSource = new MatTableDataSource();
  index: number =0;
  shipmentId: string= '';


  @ViewChild(MatPaginator, {static: true}) paginator: any;
  @ViewChild(MatSort, {static: true}) sort: any;
  @ViewChild('filter',  {static: true}) filter: any;
  constructor(
    private dataService: DataService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {id: string}) { 
      this.shipmentId = data.id
    }
  ngOnInit(): void {
    this.getShipmentItems()
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  openDialog(id:string) {
    const dialogRef=this.dialog.open(VendorReceiveItemModalComponent,{
      height: '300px',
      width: '400px',
      data: { id: id },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getShipmentItems();
    });
  }
  getShipmentItems(){ 
    this.dataService.getReceiverShipmentItem(this.shipmentId).subscribe(
      response => {
        this.dataSource.data= response.data.rows.map(function(x:any) {
          return {    
            "Item_Id": x[0],
            "Model": x[1],
            "Imei": x[2],
            "Vendor_Received": x[3],
            "Receiver_Shipment_Id": x[4],
            "Tracking_Number": x[5],
          }
        })
      },
      error => {
      }
    );
  }

}
