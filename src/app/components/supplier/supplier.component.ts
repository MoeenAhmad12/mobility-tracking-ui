import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user-model';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  
  @ViewChild('closeModal') private closeModal:any;
  suppliers: UserModel[] = [];
  supplierForm= this.formBuilder.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    address: ['']
  });
  displayedColumns: string[] = ['Name', 'Phone','Address','Actions'];
  dataSource = new MatTableDataSource(this.suppliers);

  @ViewChild(MatSort) sort: any;

  

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getSuppliers();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  hideModel() {
    this.closeModal.nativeElement.click();      
  }
  addSupplier(){
    const payload={
      "Name":  this.supplierForm.value.name,
      "Phone":  this.supplierForm.value.phone,
      "Address":  this.supplierForm.value.address,
    }
    this.dataService.createSupplier(payload).subscribe(
      response => {
        this.toastr.success(response.message, "Supplier")
        this.supplierForm.reset()
        this.hideModel();
        this.getSuppliers();
      },
      error => {
        this.toastr.error("Error in creating receiver", "Receiver")
      }
    );
  }

  getSuppliers(){
    this.dataService.getSuppliers().subscribe(
      response => {
        this.suppliers= response.data.rows.map(function(x:any) {
          return {    
              "Name": x[1],
              "Address": x[2],
              "Phone": x[3]
          }
        })
        this.dataSource.data=this.suppliers;
      },
      error => {
      }
    );
  }
}
