import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UnReceivedParcelItemsComponent } from 'src/app/modals/un-received-parcel-items/un-received-parcel-items.component';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-receiver-inventory',
  templateUrl: './receiver-inventory.component.html',
  styleUrls: ['./receiver-inventory.component.css']
})
export class ReceiverInventoryComponent implements OnInit {

  displayedColumns: string[] = ['Model','Imei','Vendor_Price'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: any;



  @ViewChild(MatPaginator, {static: true}) paginator: any;
  @ViewChild('filter',  {static: true}) filter: any;
  constructor(
    private dataService: DataService,
    private toastr: ToastrService,private dialog: MatDialog,) { }
  ngOnInit(): void {
    this.getReceiverInventory()
  }
  getReceiverInventory(){
    this.dataService.getReceiverInventory().subscribe(
      response => {
        const items= response.data.rows.map(function(x:any) {
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
        this.dataSource.data = items.filter((x: { Is_Sent: number; }) => x.Is_Sent == 0)
      
      },
      error => {
        this.toastr.error("Error in getting supplier parcel", "Supplier Parcel")
      }
    );
  }
}
