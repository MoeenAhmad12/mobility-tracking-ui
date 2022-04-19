import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-received-shipment',
  templateUrl: './received-shipment.component.html',
  styleUrls: ['./received-shipment.component.css']
})
export class ReceivedShipmentComponent implements OnInit {

  displayedColumns = ['id', 'title', 'state', 'url', 'created_at', 'updated_at', 'actions'];
  exampleDatabase: any
  dataSource: any;
  index: number =0;
  id: number=0;


  @ViewChild(MatPaginator, {static: true}) paginator: any;
  @ViewChild(MatSort, {static: true}) sort: any;
  @ViewChild('filter',  {static: true}) filter: any;
  constructor() { }

  ngOnInit(): void {
  }

}
