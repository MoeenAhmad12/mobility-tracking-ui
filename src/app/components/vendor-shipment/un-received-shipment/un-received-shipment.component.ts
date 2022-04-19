import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-un-received-shipment',
  templateUrl: './un-received-shipment.component.html',
  styleUrls: ['./un-received-shipment.component.css']
})
export class UnReceivedShipmentComponent implements OnInit {

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
