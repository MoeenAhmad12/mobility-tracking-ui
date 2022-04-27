import { Component, OnInit, ViewChild } from '@angular/core';
import { VendorReceivedItemComponent } from './vendor-received-item/vendor-received-item.component';

@Component({
  selector: 'app-vendor-inventory',
  templateUrl: './vendor-inventory.component.html',
  styleUrls: ['./vendor-inventory.component.css']
})
export class VendorInventoryComponent implements OnInit {

  @ViewChild(VendorReceivedItemComponent, {static : true}) child : any;
  constructor() { }

  ngOnInit(): void {
  }
  
  itemReceived(val:any){
    this.child.getVendorReceivedItems();
  }
}
