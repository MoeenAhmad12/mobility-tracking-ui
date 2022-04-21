import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddShipmentModalComponent } from 'src/app/modals/add-shipment-modal/add-shipment-modal.component';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css']
})
export class ShipmentComponent implements OnInit {

  displayedColumns = ['id', 'title', 'state', 'url', 'created_at', 'updated_at', 'actions'];
  exampleDatabase: any
  dataSource: any;
  index: number =0;
  id: number=0;


  @ViewChild(MatPaginator, {static: true}) paginator: any;
  @ViewChild(MatSort, {static: true}) sort: any;
  @ViewChild('filter',  {static: true}) filter: any;
  constructor(
    private dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  addShipment() {
    const dialogRef=this.dialog.open(AddShipmentModalComponent,{
      height: '410px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
