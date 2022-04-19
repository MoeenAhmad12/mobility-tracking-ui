import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user-model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  private baseUrl: string ='http://localhost:8000';

  createReceiver(payload: UserModel) {
    const url = this.baseUrl + '/AddReceiver';
    return this.http.post(url, payload).pipe(map((response: any) => response));
  }
  updateReceiver(payload: UserModel) {
    const url = this.baseUrl + '/UpdateReceiver';
    return this.http.put(url, payload).pipe(map((response: any) => response));
  }

  deleteReceiver(id: number) {
    const url = this.baseUrl + '/Receiver?id='+id;
    return this.http.delete(url).pipe(map((response: any) => response));
  }

  getReceivers() {
    const url = this.baseUrl + '/GetReceivers';
    return this.http.get(url).pipe(
      map((response: any) => response)
    );
  }



  createVendor(payload: UserModel) {
    const url = this.baseUrl + '/AddVendor';
    return this.http.post(url, payload).pipe(map((response: any) => response));
  }

  updateVendor(payload: UserModel) {
    const url = this.baseUrl + '/UpdateVendor';
    return this.http.put(url, payload).pipe(map((response: any) => response));
  }

  getVendors() {
    const url = this.baseUrl + '/GetVendors';
    return this.http.get(url).pipe(
      map((response: any) => response)
    );
  }


  

  createSupplier(payload: UserModel) {
    const url = this.baseUrl + '/AddSupplier';
    return this.http.post(url, payload).pipe(map((response: any) => response));
  }

  updateSupplier(payload: UserModel) {
    const url = this.baseUrl + '/UpdateSupplier';
    return this.http.put(url, payload).pipe(map((response: any) => response));
  }
  getSuppliers() {
    const url = this.baseUrl + '/GetSuppliers';
    return this.http.get(url).pipe(
      map((response: any) => response)
    );
  }



  createSupplierParcel(payload: any) {
    const url = this.baseUrl + '/AddSupplierParcel';
    return this.http.post(url, payload).pipe(map((response: any) => response));
  }

  getSupplierParcels() {
    const url = this.baseUrl + '/GetSupplierParcels';
    return this.http.get(url).pipe(
      map((response: any) => response)
    );
  }

  createParcelItem(payload: any) {
    const url = this.baseUrl + '/AddSupplierParcelsItem';
    return this.http.post(url, payload).pipe(map((response: any) => response));
  }

  updateParcelItem(payload: any) {
    const url = this.baseUrl + '/UpdateParcelItem';
    return this.http.post(url, payload).pipe(map((response: any) => response));
  }

  getParcelItems(id: string) {
    const url = this.baseUrl + '/GetParcelsItems?ParcelId='+id;
    return this.http.get(url).pipe(
      map((response: any) => response)
    );
  }

  getSupplierUnPaidItems(id: string) {
    const url = this.baseUrl + '/GetSupplierUnPaidItems?SupplierId='+id;
    return this.http.get(url).pipe(
      map((response: any) => response)
    );
  }

  getSupplierUnReceivedItems(id: string) {
    const url = this.baseUrl + '/GetSupplierUnReceivedItems?ParcelId='+id;
    return this.http.get(url).pipe(
      map((response: any) => response)
    );
  }
  getUnReceivedParcels() {
    const url = this.baseUrl + '/GetSupplierParcels?StartDate=10-10-2020&EndDate=20-12-2022&IsReceived=false'
    return this.http.get(url).pipe(
      map((response: any) => response)
    );
  }

  getReceivedParcels() {
    const url = this.baseUrl + '/GetSupplierParcels?StartDate=10-10-2020&EndDate=20-12-2022&IsReceived=true'
    return this.http.get(url).pipe(
      map((response: any) => response)
    );
  }

  getReceiverPaidParcels() {
    const url = this.baseUrl + '/ReceiverPaidParcels';
    return this.http.get(url).pipe(
      map((response: any) => response)
    );
  }

  getReceiverUnPaidParcels() {
    const url = this.baseUrl + '/ReceiverUnpaidParcels';
    return this.http.get(url).pipe(
      map((response: any) => response)
    );
  }

  markParcelPaid(id:string) {
    const url = this.baseUrl + '/UpdateReceiverPaid';
    var obj ={
      "Id":id
    }
    return this.http.post(url, obj).pipe(map((response: any) => response));
  }
  markParcelItemPaid(id:string) {
    const url = this.baseUrl + '/MarkParcelItemPaid';
    var obj ={
      "Id":id
    }
    return this.http.post(url, obj).pipe(map((response: any) => response));
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
