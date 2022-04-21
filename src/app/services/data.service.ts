import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user-model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  private baseUrl: string ='http://localhost:8000';

  createReceiver(payload: UserModel) : Observable<any>{
    const url = this.baseUrl + '/AddReceiver';
    return this.http.post(url, payload).pipe(map((response: any) => response));
  }
  updateReceiver(payload: UserModel) : Observable<any>{
    const url = this.baseUrl + '/UpdateReceiver';
    return this.http.put(url, payload).pipe(map((response: any) => response));
  }

  deleteReceiver(id: number) : Observable<any>{
    const url = this.baseUrl + '/Receiver?id='+id;
    return this.http.delete(url).pipe(map((response: any) => response));
  }

  getReceivers() : Observable<any>{
    const url = this.baseUrl + '/GetReceivers';
    return this.http.get(url).pipe(
      map((response: any) => response)
    );
  }



  createVendor(payload: UserModel) : Observable<any>{
    const url = this.baseUrl + '/AddVendor';
    return this.http.post(url, payload).pipe(map((response: any) => response));
  }

  updateVendor(payload: UserModel) : Observable<any>{
    const url = this.baseUrl + '/UpdateVendor';
    return this.http.put(url, payload).pipe(map((response: any) => response));
  }

  getVendors() : Observable<any>{
    const url = this.baseUrl + '/GetVendors';
    return this.http.get(url).pipe(
      map((response: any) => response)
    );
  }


  

  createSupplier(payload: UserModel) : Observable<any>{
    const url = this.baseUrl + '/AddSupplier';
    return this.http.post(url, payload).pipe(map((response: any) => response));
  }

  updateSupplier(payload: UserModel) : Observable<any>{
    const url = this.baseUrl + '/UpdateSupplier';
    return this.http.put(url, payload).pipe(map((response: any) => response));
  }
  getSuppliers() : Observable<any>{
    const url = this.baseUrl + '/GetSuppliers';
    return this.http.get(url).pipe(
      map((response: any) => response)
    );
  }



  createSupplierParcel(payload: any) : Observable<any>{
    const url = this.baseUrl + '/AddSupplierParcel';
    return this.http.post(url, payload).pipe(map((response: any) => response));
  }

  getSupplierParcels() : Observable<any>{
    const url = this.baseUrl + '/GetSupplierParcels';
    return this.http.get(url).pipe(
      map((response: any) => response)
    );
  }

  createParcelItem(payload: any) : Observable<any>{
    const url = this.baseUrl + '/AddSupplierParcelsItem';
    return this.http.post(url, payload).pipe(map((response: any) => response));
  }

  updateParcelItem(payload: any) : Observable<any>{
    const url = this.baseUrl + '/UpdateParcelItem';
    return this.http.post(url, payload).pipe(map((response: any) => response));
  }

  getParcelItems(id: string) : Observable<any>{
    const url = this.baseUrl + '/GetParcelsItems?ParcelId='+id;
    return this.http.get(url).pipe(
      map((response: any) => response)
    );
  }

  getSupplierUnPaidItems(id: string)  : Observable<any>{
    const url = this.baseUrl + '/GetSupplierUnPaidItems?SupplierId='+id;
    return this.http.get(url).pipe(
      map((response: any) => response)
    );
  }

  getSupplierUnReceivedItems(id: string) : Observable<any>{
    const url = this.baseUrl + '/GetSupplierUnReceivedItems?SupplierId='+id;
    return this.http.get(url).pipe(
      map((response: any) => response)
    );
  }
  getUnReceivedParcels() : Observable<any>{
    const url = this.baseUrl + '/GetSupplierParcels?IsReceived=false'
    return this.http.get(url).pipe(
      map((response: any) => response)
    );
  }

  getReceivedParcels() : Observable<any>{
    const url = this.baseUrl + '/GetSupplierParcels?IsReceived=true'
    return this.http.get(url).pipe(
      map((response: any) => response)
    );
  }

  getReceiverPaidParcels() : Observable<any>{
    const url = this.baseUrl + '/ReceiverPaidParcels';
    return this.http.get(url).pipe(
      map((response: any) => response)
    );
  }

  getReceiverUnPaidParcels() : Observable<any>{
    const url = this.baseUrl + '/ReceiverUnpaidParcels';
    return this.http.get(url).pipe(
      map((response: any) => response)
    );
  }

  markParcelPaid(id:string) : Observable<any>{
    const url = this.baseUrl + '/UpdateReceiverPaid';
    var obj ={
      "Id":id
    }
    return this.http.post(url, obj).pipe(map((response: any) => response));
  }
  markParcelItemPaid(id:string) : Observable<any>{
    const url = this.baseUrl + '/MarkParcelItemPaid';
    var obj ={
      "Id":id
    }
    return this.http.post(url, obj).pipe(map((response: any) => response));
  }

  markParcelReceived(obj:any) : Observable<any>{
    const url = this.baseUrl + '/ParcelReceived';
    return this.http.post(url, obj).pipe(map((response: any) => response));
  }

  markParcelItemReceived(obj:any) : Observable<any>{
    const url = this.baseUrl + '/UpdateItemReceive';
    return this.http.post(url, obj).pipe(map((response: any) => response));
  }

  getVendorUnPaidItem(id:string) : Observable<any>{
    var url = this.baseUrl + '/GetVendorUnPaidItem';
    if(id){
      url= url+'?VendorId='+id
    }
    return this.http.get(url).pipe(
      map((response: any) => response)
    );
  }

  getVendorPaidItem(id:string) : Observable<any>{
    var url = this.baseUrl + '/GetVendorPaidItem';
    if(id){
      url= url+'?VendorId='+id
    }
    return this.http.get(url).pipe(
      map((response: any) => response)
    );
  }
  
  getVendorUnReceivedItem(id:string) : Observable<any>{
    const url = this.baseUrl + '/GetVendorUnReceivedItem';
    return this.http.get(url).pipe(
      map((response: any) => response)
    );
  }
  
  vendorReceiveShipment(id:string) : Observable<any>{
    const obj ={
      "receiver_shipment_id": id
    }
    const url = this.baseUrl + '/VendorReceiveShipment';
    return this.http.post(url, obj).pipe(map((response: any) => response));
  }

  
  getReceiverShipmentItem(id:string) : Observable<any>{
    const url = this.baseUrl + '/GetReceiverShipmentItem';
    return this.http.get(url).pipe(
      map((response: any) => response)
    );
  }

  GetReceiverShipmentItemReceived(id:string) : Observable<any>{
    const url = this.baseUrl + '/GetReceiverShipmentItemReceived';
    return this.http.get(url).pipe(
      map((response: any) => response)
    );
  }
  
  createShipment(payload: any) : Observable<any>{
    const url = this.baseUrl + '/AddReceiverShipment';
    return this.http.post(url, payload).pipe(map((response: any) => response));
  }












  createUser(payload: UserModel) {
    const url = this.baseUrl + '/user';
    return this.http.post(url, payload).pipe(map((response: any) => response));
  }

  updateUser(payload: UserModel) {
    const url = this.baseUrl + '/user';
    return this.http.put(url, payload).pipe(map((response: any) => response));
  }

  deleteUser(id: number) {
    const url = this.baseUrl + '/user?id='+id;
    return this.http.delete(url).pipe(map((response: any) => response));
  }

  getUsers() {
    const url = this.baseUrl + '/user';
    return this.http.get(url).pipe(
      map((response: any) => response)
    );
  }
}
