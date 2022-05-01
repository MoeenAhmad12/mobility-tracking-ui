import { Component, OnInit, ViewChild } from '@angular/core';
import { SetPriceParcelsComponent } from './set-price-parcels/set-price-parcels.component';

@Component({
  selector: 'app-price-parcels',
  templateUrl: './price-parcels.component.html',
  styleUrls: ['./price-parcels.component.css']
})
export class PriceParcelsComponent implements OnInit {

  @ViewChild(SetPriceParcelsComponent, {static : true}) child : any;
  constructor() { }

  ngOnInit(): void {
  }
  priceParcel(){
    this.child.getPaidReceiverParcels();
  }

}
