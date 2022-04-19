export interface ParcelItemModel {
    Id: string;
    Model: string;
    Price: number;
    Parcel_Id: string;
    Is_Received?:number;
    Is_Paid?: number;
    Created_At: string;
    Paid_At: string;
  }