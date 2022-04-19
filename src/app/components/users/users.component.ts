import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
  userForm= this.formBuilder.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    address: [''],
    type:['']
  });
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService) { }

  ngOnInit(): void {
  }
}
