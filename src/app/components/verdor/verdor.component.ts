import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AddVendorModalComponent } from 'src/app/modals/add-vendor-modal/add-vendor-modal.component';
import { UserModel } from 'src/app/models/user-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-verdor',
  templateUrl: './verdor.component.html',
  styleUrls: ['./verdor.component.css']
})
export class VerdorComponent implements OnInit, AfterViewInit {
  @ViewChild('closeModal') private closeModal:any;
  
  vendors: UserModel[] = [];
  displayedColumns: string[] = ['Name', 'Phone','Address','Actions'];
  dataSource = new MatTableDataSource(this.vendors);

  @ViewChild(MatSort) sort: any;

  
  
  constructor(
    private dataService: DataService,
    private toastr: ToastrService,
    private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getVendors();
  }
  addVendor(row?:any) {
    const dialogRef=this.dialog.open(AddVendorModalComponent,{
      height: '450px',
      width: '500px',
      data:{row:row}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getVendors();
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  
  getVendors(){
    this.dataService.getVendors().subscribe(
      response => {
        this.vendors= response.data.rows.map(function(x:any) {
          return {    
              "Id": x[0],
              "Name": x[1],
              "Phone": x[2],
              "Address": x[3]
          }
        })
        this.dataSource.data=this.vendors
      },
      error => {
        this.toastr.error("Error in getting vendor", "Vendor")
      }
    );
  }
}
