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
import { ShipmentComponent } from './components/shipment/shipment.component';
import { ReceiverParcelsComponent } from './components/receiver-parcels/receiver-parcel.component';
import { ReceiverPayParcelsComponent } from './components/receiver-pay-parcel/receiver-pay-parcel.component';
import { VendorShipmentComponent } from './components/vendor-shipment/vendor-shipment.component';
import { UnReceivedParcelItemsComponent } from './modals/un-received-parcel-items/un-received-parcel-items.component';
import { UnPaidParcelItemsComponent } from './modals/un-paid-parcel-items/un-paid-parcel-items.component';

import {MatDialog} from '@angular/material/dialog';
import { UnReceivedShipmentItemsComponent } from './modals/un-received-shipment-items/un-received-shipment-items.component';
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
    ReceiverParcelsComponent,
    ReceiverPayParcelsComponent,
    VendorShipmentComponent,
    UnReceivedParcelItemsComponent,
    UnPaidParcelItemsComponent,
    UnReceivedShipmentItemsComponent,
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
