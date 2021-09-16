import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  loaded=false;
  registerForm: FormGroup;
  Date: string;
  month: any;
  year: any;
  date: any;
  failure: boolean;
  errmsg: any;
  events: any;
  msg: string;
  constructor(private formBuilder:FormBuilder,private router:Router,private apiservice:LoginService,private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this.allEvents();
    this.year = new Date().getUTCFullYear();
    this.month = new Date().getUTCMonth()+1;
    this.date = new Date().getDate();
    
    if(this.month < 10){
      this.month="0"+this.month
      console.log("mon",this.month)
    }
    if(this.date <10){
      this.date = "0"+this.date
      console.log(this.date)
    }
    this.Date = this.year+"-"+this.month+"-"+this.date
    console.log(this.Date)
    this.registerForm = this.formBuilder.group({
      Ename:['',[Validators.required]],
      des:['',[Validators.required]],
      domin:['',[Validators.required]],
      city:['',[Validators.required, Validators.pattern('[A-Za-z]*')]],
      date:['',[Validators.required]],
      ticket:['',[Validators.required, Validators.pattern('[1-9][0-9]*')]],
      price:['',[Validators.required, Validators.pattern('[0-9]*')]],
    })
  }

  get f() {return this.registerForm.controls;}

  allEvents(){
    this.apiservice.getAllEvents().subscribe(
      result=>{
        if(result.data.length > 0){
          this.events = result.data;
          this.loaded = true
        }
        else if(result.data.length == 0){
          this.msg="No Events available";
          this.loaded = true
        }
        else{
          this.msg = "Somthing went wrong";
          this.loaded = true
        }
      },
      error=>{
        this.loaded = true
      }
    )
  }

  addevent(){
    let data={
      name:this.f.Ename.value,
      des:this.f.des.value,
      domin:this.f.domin.value,
      city:this.f.city.value,
      date:this.f.date.value,
      tickets:this.f.ticket.value,
      price:this.f.price.value,
    }
    this.apiservice.addEvent(data).subscribe(
      result=>{
        if(result.data){
          $("#add").modal('show');
          this.registerForm.reset();
        }
        else{
          $("#error").modal('show');
          this.registerForm.reset();
        }
      }
    )
  }
  logOut(){
    window.sessionStorage.clear();
      localStorage.clear();
      window.location.assign('/');
      // localStorage.setItem('isUser','false')
  }
}
