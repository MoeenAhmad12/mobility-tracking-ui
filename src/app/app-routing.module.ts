import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceiverInventoryComponent } from './components/receiver-inventory/receiver-inventory.component';
import { ReceiverParcelsComponent } from './components/receiver-parcels/receiver-parcel.component';
import { ReceiverPayParcelsComponent } from './components/receiver-pay-parcel/receiver-pay-parcel.component';
import { ReceiverComponent } from './components/receiver/receiver.component';
import { ShipmentComponent } from './components/vendor-shipment/shipment/shipment.component';
import { SupplierParcelsComponent } from './components/supplier-parcels/supplier-parcels.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { UsersComponent } from './components/users/users.component';
import { VendorInventoryComponent } from './components/vendor-inventory/vendor-inventory.component';
import { VendorUnReceivedItemComponent } from './components/vendor-inventory/vendor-un-received-item/vendor-un-received-item.component';
import { VendorItemsComponent } from './components/vendor-items/vendor-items.component';
import { VendorShipmentComponent } from './components/vendor-shipment/vendor-shipment.component';
import { VerdorComponent } from './components/verdor/verdor.component';
import { LedgerComponent } from './components/ledger/ledger.component';

const routes: Routes = [
  {path: 'supplier-percel', component: SupplierParcelsComponent },
  {path: 'receiver-parcels', component: ReceiverParcelsComponent },
  {path: 'receiver-pay-parcels', component: ReceiverPayParcelsComponent },
  {path: 'receiver-inventory', component: ReceiverInventoryComponent },
  {path: 'vendor-shipment', component: VendorShipmentComponent },
  {path: 'vendor-items', component: VendorItemsComponent },
  {path: 'vendor-inventory', component: VendorInventoryComponent },
  {path: 'ledger', component: LedgerComponent },
  {path: 'users', component: UsersComponent },
  {path: '', component: UsersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
