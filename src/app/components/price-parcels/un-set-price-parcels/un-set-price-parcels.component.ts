import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { PayParcelModalComponent } from 'src/app/modals/pay-parcel-modal/pay-parcel-modal.component';
import { UserModel } from 'src/app/models/user-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-un-set-price-parcels',
  templateUrl: './un-set-price-parcels.component.html',
  styleUrls: ['./un-set-price-parcels.component.css']
})
export class UnSetPriceParcelsComponent implements OnInit, AfterViewInit {
  
  @Output() priceParcel: EventEmitter<any> = new EventEmitter();
  receivers: UserModel[] = [];
  displayedColumns = ['select','Tracking_Number', 'Post_Code', 'Actions'];
  dataSource =  new MatTableDataSource();
  selection = new SelectionModel<any>(true, []);
  vendorId:string='';
  config = {
    displayKey:"Name", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Select Receiver', // text to be displayed when no item is selected defaults to Select,
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Search', // label thats displayed in search input,
    searchOnKey: 'Name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  }

  @ViewChild(MatPaginator, {static: true}) paginator: any;
  @ViewChild(MatSort, {static: true}) sort: any;
  @ViewChild('filter',  {static: true}) filter: any;
  constructor(
    private dataService: DataService,
    private toastr: ToastrService,
    private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getReceivers()
  }
  receiveSelected(){
    const dialogRef=this.dialog.open(PayParcelModalComponent,{
      height: '300px',
      width: '400px',
      data: { mode: true},
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        var selected:any[]=[];
        this.selection.selected.forEach(element=>{
            selected.push(element.Id)
        });
        var payload = {
          "Parcel_Price": result,
          "Parcel_Id":   selected   
        }
            
        this.dataService.UpdateIsEnteredAndParcelPrice(payload).subscribe(
          response => {
            this.toastr.success(response.message, "Parcel")
            this.priceParcel.emit();
            this.getUnPaidReceiverParcels();
          },
          error => {
          }
        );
      }
      this.priceParcel.emit();
      this.getUnPaidReceiverParcels();
    });
    console.log( this.selection)
  }
  isAllSelected() {
     const numSelected = this.selection.selected.length;
     const numRows = this.dataSource.data.length;
     return numSelected === numRows;
  }
 
   /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
     if (this.isAllSelected()) {
       this.selection.clear();
       return;
     }
 
     this.selection.select(...this.dataSource.data);
  }
 
  checkboxLabel(row?: any): string {
     if (!row) {
       return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
     }
     return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
 
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  receiverChanged(val:any){
    this.vendorId= val.value.Id
    this.getUnPaidReceiverParcels()
  }
  payParcel(row:any){
    const dialogRef=this.dialog.open(PayParcelModalComponent,{
      height: '300px',
      width: '400px',
      data: { id: row.Id },
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.priceParcel.emit();
      this.getUnPaidReceiverParcels();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
      },
      error => {
      }
    );
  }
  getUnPaidReceiverParcels(){
    this.dataService.getUnPaidReceiverParcels(this.vendorId).subscribe(
      response => {
        this.dataSource.data= response.data.rows.map(function(x:any) {
          return {   
            "Id": x[0], 
            "Tracking_Number": x[1], 
            "Post_Code": x[2], 
            "Parcel_Price": x[3], 
          }
        })
      },
      error => {
      }
    );
  }

}
