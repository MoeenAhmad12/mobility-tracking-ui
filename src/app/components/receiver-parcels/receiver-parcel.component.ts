import { Component, OnInit, ViewChild } from '@angular/core';
import { ReceivedParcelsComponent } from './received-parcels/received-parcels.component';

@Component({
  selector: 'app-receiver-parcel',
  templateUrl: './receiver-parcel.component.html',
  styleUrls: ['./receiver-parcel.component.css']
})
export class ReceiverParcelsComponent implements OnInit {

  @ViewChild(ReceivedParcelsComponent, {static : true}) child : any;
  constructor() { }

  ngOnInit(): void {
  }
  parcelReceived(val:any){
    this.child.getReceivedParcels()
  }

}
