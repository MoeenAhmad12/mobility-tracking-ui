import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
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
  vendorForm= this.formBuilder.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    address: ['']
  });
  displayedColumns: string[] = ['Name', 'Phone','Address','Actions'];
  dataSource = new MatTableDataSource(this.vendors);

  @ViewChild(MatSort) sort: any;

  
  
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getVendors();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  hideModel() {
    this.closeModal.nativeElement.click();      
  }
  addVendor(){
    const payload={
      "Name":  this.vendorForm.value.name,
      "Phone":  this.vendorForm.value.phone,
      "Address":  this.vendorForm.value.address,
    }
    this.dataService.createVendor(payload).subscribe(
      response => {
        this.toastr.success(response.message, "Vendor")
        this.vendorForm.reset()
        this.hideModel();
        this.getVendors();
      },
      error => {
        this.toastr.error("Error in creating vendor", "Vendor")
      }
    );
  }

  getVendors(){
    this.dataService.getVendors().subscribe(
      response => {
        this.vendors= response.data.rows.map(function(x:any) {
          return {    
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
