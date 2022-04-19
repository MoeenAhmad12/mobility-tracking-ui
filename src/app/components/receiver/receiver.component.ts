import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user-model';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.css']
})
export class ReceiverComponent implements OnInit , AfterViewInit{

  @ViewChild('closeModal') private closeModal:any;
  
  receivers: UserModel[] = [];
  receiverForm= this.formBuilder.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
  });
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService,
    private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
    this.getReceivers();
  }
  displayedColumns: string[] = ['Name', 'Phone','Actions'];
  dataSource = new MatTableDataSource(this.receivers);

  @ViewChild(MatSort) sort: any;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  hideModel() {
    this.closeModal.nativeElement.click();      
  }
  addReceiver(){
    const payload={
      "Name":  this.receiverForm.value.name,
      "Phone":  this.receiverForm.value.phone,
    }
    this.dataService.createReceiver(payload).subscribe(
      response => {
        this.toastr.success(response.message, "Receiver")
        this.hideModel();
        this.receiverForm.reset();
        this.getReceivers();
      },
      error => {
        this.toastr.error("Error in creating receiver", "Receiver")
      }
    );
  }

  getReceivers(){
    this.dataService.getReceivers().subscribe(
      response => {
        this.receivers= response.data.rows.map(function(x:any) {
          return {    
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
