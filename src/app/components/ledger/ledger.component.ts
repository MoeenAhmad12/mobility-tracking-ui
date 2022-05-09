import { Component, OnInit, ViewChild } from '@angular/core';
import { UserBalanceComponent } from './user-balance/user-balance.component';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent implements OnInit {

  @ViewChild(UserBalanceComponent, {static : true}) child : any;
  constructor() { }

  ngOnInit(): void {
  }

  userTransaction(){
    this.child.getUserBalance()
  }
}
