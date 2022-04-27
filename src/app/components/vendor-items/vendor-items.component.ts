import { Component, OnInit, ViewChild } from '@angular/core';
import { VendorPaidItemsComponent } from './vendor-paid-items/vendor-paid-items.component';

@Component({
  selector: 'app-vendor-items',
  templateUrl: './vendor-items.component.html',
  styleUrls: ['./vendor-items.component.css']
})
export class VendorItemsComponent implements OnInit {

  @ViewChild(VendorPaidItemsComponent, {static : true}) child : any;
  constructor() { }

  ngOnInit(): void {
  }
  itemPaid(val:any){
    this.child.getVendorPaidItem()
  }
}
