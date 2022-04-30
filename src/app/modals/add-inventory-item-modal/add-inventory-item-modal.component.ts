import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-inventory-item-modal',
  templateUrl: './add-inventory-item-modal.component.html',
  styleUrls: ['./add-inventory-item-modal.component.css']
})
export class AddInventoryItemModalComponent implements OnInit {
  items: any;
  item:any;
  receiverId=''
  constructor(
    private dataService: DataService,
    private toastr: ToastrService,
    private  dialogRef: MatDialogRef<AddInventoryItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: string}) { 
      this.receiverId = data.id;
    }
  config = {
    displayKey:"Imei", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Select Imei', // text to be displayed when no item is selected defaults to Select,
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Search', // label thats displayed in search input,
    searchOnKey: 'Imei' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  }
  ngOnInit(): void {
    this.getReceiverInventory()
  }

  itemChanged(val:any){
    this.item =val
  }
  add(){
    this.dialogRef.close(this.item);
  }
  getReceiverInventory(){
    this.dataService.getReceiverInventory( this.receiverId).subscribe(
      response => {
        this.items= response.data.rows.map(function(x:any) {
          return {    
            "Item_Id": x[0],
            "Model": x[1],
            "Imei": x[2],
            "Vendor_Price": x[3],
            "Is_Sent": x[4],
            "Vendor_Received": x[5],
            "Vendor_Paid": x[6], 
            "Receiver_Id": x[7], 
            "Receiver_Shipment_Id": x[8], 
            "Vendor_Paid_At": x[9]
          }
        })
        this.items = this.items.filter((x: { Is_Sent: number; }) => x.Is_Sent == 0)
      },
      error => {
        this.toastr.error("Error in getting supplier parcel", "Supplier Parcel")
      }
    );
  }
}
