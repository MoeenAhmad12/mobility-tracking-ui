import { Component, OnInit, ViewChild } from '@angular/core';
import { ReceivedShipmentComponent } from './received-shipment/received-shipment.component';
import { UnReceivedShipmentComponent } from './un-received-shipment/un-received-shipment.component';

@Component({
  selector: 'app-vendor-shipment',
  templateUrl: './vendor-shipment.component.html',
  styleUrls: ['./vendor-shipment.component.css']
})
export class VendorShipmentComponent implements OnInit {

  @ViewChild(ReceivedShipmentComponent, {static : true}) child : any;
  @ViewChild(UnReceivedShipmentComponent, {static : true}) unReceivedShipment : any;
  constructor() { }

  ngOnInit(): void {
  }
  shipmentReceived(){
    this.child.getReceivedShipments()
  }
  shipmentCreated(){
    this.unReceivedShipment.getUnReceivedShipments();
  }
}
