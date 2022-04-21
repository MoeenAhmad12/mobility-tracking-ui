import { Component, OnInit, ViewChild } from '@angular/core';
import { PaidParcelsComponent } from './paid-parcels/paid-parcels.component';

@Component({
  selector: 'app-receiver-pay-parcel',
  templateUrl: './receiver-pay-parcel.component.html',
  styleUrls: ['./receiver-pay-parcel.component.css']
})
export class ReceiverPayParcelsComponent implements OnInit {

  @ViewChild(PaidParcelsComponent, {static : true}) child : any;
  constructor() { }

  ngOnInit(): void {
  }
  parcelPaid(val:any){
    this.child.getReceiverPaidParcels()
  }

}
