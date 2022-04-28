import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user-model';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddSupplierModalComponent } from 'src/app/modals/add-supplier-modal/add-supplier-modal.component';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  
  @ViewChild('closeModal') private closeModal:any;
  suppliers: UserModel[] = [];
  displayedColumns: string[] = ['Name', 'Phone','Address','Actions'];
  dataSource = new MatTableDataSource(this.suppliers);

  @ViewChild(MatSort) sort: any;

  

  constructor(
    private dataService: DataService,
    private toastr: ToastrService,
    private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getSuppliers();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  addSupplier(row?:any) {
    const dialogRef=this.dialog.open(AddSupplierModalComponent,{
      height: '430px',
      width: '500px',
      data:{row:row}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getSuppliers();
    });
  }

  getSuppliers(){
    this.dataService.getSuppliers().subscribe(
      response => {
        this.suppliers= response.data.rows.map(function(x:any) {
          return {    
              "Id": x[0],
              "Name": x[1],
              "Phone": x[2],
              "Address": x[3]
          }
        })
        this.dataSource.data=this.suppliers;
      },
      error => {
      }
    );
  }
}
