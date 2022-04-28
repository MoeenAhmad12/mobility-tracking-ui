import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user-model';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddReceiverModalComponent } from 'src/app/modals/add-receiver-modal/add-receiver-modal.component';
@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.css']
})
export class ReceiverComponent implements OnInit , AfterViewInit{

  @ViewChild('closeModal') private closeModal:any;
  
  receivers: UserModel[] = [];
  constructor(
    private dataService: DataService,
    private toastr: ToastrService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getReceivers();
  }
  displayedColumns: string[] = ['Name', 'Phone','Actions'];
  dataSource = new MatTableDataSource(this.receivers);

  @ViewChild(MatSort) sort: any;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  addReceiver(row?:any) {
    const dialogRef=this.dialog.open(AddReceiverModalComponent,{
      height: '350px',
      width: '500px',
      data:{row:row}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getReceivers();
    });
  }
  getReceivers(){
    this.dataService.getReceivers().subscribe(
      response => {
        this.receivers= response.data.rows.map(function(x:any) {
          return {    
              "Id": x[0],
              "Name": x[1],
              "Phone": x[2]
          }
        })
        this.dataSource.data=this.receivers
      },
      error => {
      }
    );
  }

}
