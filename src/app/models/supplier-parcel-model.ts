export interface SuppliesParcelModel {
    Id: string;
    Tracking_Number: string;
    Post_Code: string;
    Supplier_Name: string;
    Receiver_Name: string;
    Supplier_Id: string;
    Receiver_Id: string;
    Created_At?: string;
    Date: string;
    Is_Empty?:number;
    Receiver_Paid?:number;
    Received?:number;
    Received_At?: string;
    Paid_At?: string;
  }