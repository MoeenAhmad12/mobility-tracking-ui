import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SupplierParcelsComponent } from './components/supplier-parcels/supplier-parcels.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { VerdorComponent } from './components/verdor/verdor.component';
import { ReceiverComponent } from './components/receiver/receiver.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { SupplierParcelModalComponent } from './modals/supplier-parcel-modal/supplier-parcel-modal.component';
import { ParcelItemModalComponent } from './modals/parcel-item-modal/parcel-item-modal.component'

import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import { UnReceivedItemsComponent } from './components/un-received-items/un-received-items.component';
import { UnPaidItemsComponent } from './components/un-paid-items/un-paid-items.component';
import { ReceivedParcelsComponent } from './components/receiver-parcels/received-parcels/received-parcels.component';
import { UnReceivedParcelsComponent } from './components/receiver-parcels/un-received-parcels/un-received-parcels.component';
import { UnPaidParcelsComponent } from './components/receiver-pay-parcel/un-paid-parcels/un-paid-parcels.component';
import { PaidParcelsComponent } from './components/receiver-pay-parcel/paid-parcels/paid-parcels.component';
import { ReceiverInventoryComponent } from './components/receiver-inventory/receiver-inventory.component';
import { UnReceivedShipmentComponent } from './components/vendor-shipment/un-received-shipment/un-received-shipment.component';
import { ReceivedShipmentComponent } from './components/vendor-shipment/received-shipment/received-shipment.component';
import { ShipmentComponent } from './components/vendor-shipment/shipment/shipment.component';
import { ReceiverParcelsComponent } from './components/receiver-parcels/receiver-parcel.component';
import { ReceiverPayParcelsComponent } from './components/receiver-pay-parcel/receiver-pay-parcel.component';
import { VendorShipmentComponent } from './components/vendor-shipment/vendor-shipment.component';
import { UnReceivedParcelItemsComponent } from './modals/un-received-parcel-items/un-received-parcel-items.component';
import { UnPaidParcelItemsComponent } from './modals/un-paid-parcel-items/un-paid-parcel-items.component';

import {MatDialog} from '@angular/material/dialog';
import { UnReceivedShipmentItemsComponent } from './modals/un-received-shipment-items/un-received-shipment-items.component';
import { ReceiveParcelComponent } from './modals/receive-parcel/receive-parcel.component';
import { VendorUnpaidItemsComponent } from './components/vendor-items/vendor-unpaid-items/vendor-unpaid-items.component';
import { VendorPaidItemsComponent } from './components/vendor-items/vendor-paid-items/vendor-paid-items.component';
import { VendorItemsComponent } from './components/vendor-items/vendor-items.component';
import { AddSupplierModalComponent } from './modals/add-supplier-modal/add-supplier-modal.component';
import { AddReceiverModalComponent } from './modals/add-receiver-modal/add-receiver-modal.component';
import { AddVendorModalComponent } from './modals/add-vendor-modal/add-vendor-modal.component';
import { AddParcelItemModalComponent } from './modals/add-parcel-item-modal/add-parcel-item-modal.component';
import { AddShipmentModalComponent } from './modals/add-shipment-modal/add-shipment-modal.component';
import { VendorInventoryComponent } from './components/vendor-inventory/vendor-inventory.component';
import { VendorUnReceivedItemComponent } from './components/vendor-inventory/vendor-un-received-item/vendor-un-received-item.component';
import { VendorReceivedItemComponent } from './components/vendor-inventory/vendor-received-item/vendor-received-item.component';
import { VendorReceiveItemModalComponent } from './modals/vendor-receive-item-modal/vendor-receive-item-modal.component';
import { AddInventoryItemModalComponent } from './modals/add-inventory-item-modal/add-inventory-item-modal.component';
import { UpdateParcelItemModalComponent } from './modals/update-parcel-item-modal/update-parcel-item-modal.component';
import { LedgerComponent } from './components/ledger/ledger.component';
import { UserBalanceComponent } from './components/ledger/user-balance/user-balance.component';
import { UserTransactionsComponent } from './components/ledger/user-transactions/user-transactions.component';
import { PayUserComponent } from './modals/pay-user/pay-user.component';
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    SupplierParcelsComponent,
    SupplierComponent,
    VerdorComponent,
    ReceiverComponent,
    SupplierParcelModalComponent,
    ParcelItemModalComponent,
    UnReceivedItemsComponent,
    UnPaidItemsComponent,
    ReceivedParcelsComponent,
    UnReceivedParcelsComponent,
    UnPaidParcelsComponent,
    PaidParcelsComponent,
    ReceiverInventoryComponent,
    UnReceivedShipmentComponent,
    ReceivedShipmentComponent,
    ShipmentComponent,
    VendorItemsComponent,
    ReceiverParcelsComponent,
    ReceiverPayParcelsComponent,
    VendorShipmentComponent,
    UnReceivedParcelItemsComponent,
    UnPaidParcelItemsComponent,
    UnReceivedShipmentItemsComponent,
    ReceiveParcelComponent,
    VendorUnpaidItemsComponent,
    VendorPaidItemsComponent,
    AddSupplierModalComponent,
    AddReceiverModalComponent,
    AddVendorModalComponent,
    AddParcelItemModalComponent,
    AddShipmentModalComponent,
    VendorInventoryComponent,
    VendorUnReceivedItemComponent,
    VendorReceivedItemComponent,
    VendorReceiveItemModalComponent,
    AddInventoryItemModalComponent,
    UpdateParcelItemModalComponent,
    LedgerComponent,
    UserBalanceComponent,
    UserTransactionsComponent,
    PayUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SelectDropDownModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatButtonModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
