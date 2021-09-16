import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from "../login/login.service";
declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  loaded=false;
  img: string;
  users: any=[];
  errmsg: any;
  events: any=[];
  historyevents: any=[];
  msg: string;
  more:any;
  history: any=[];
  time: any=[];
  msgresult: any;
  constructor(private router:Router,private apiservice:LoginService) { }

  ngOnInit(): void {
    // this.users.name="kk";
    this.userById();
    this.allEvents();
    this.History();
  }

  userById(){
    let id = localStorage.getItem('userId')
    this.apiservice.userById(id).subscribe(
      result=>{
        if(result.data){
          console.log(result.data)
          this.users = result.data
          this.img='../../../assets/avarters/'+this.users.profilePicture+'.PNG'
          this.errmsg = false
          this.loaded=true
        }
        else{
          this.errmsg = true
        }
      }
    )
  }
  allEvents(){
    this.apiservice.getAllEvents().subscribe(
      result=>{
        if(result.data.length > 0){
          this.events = result.data;
          this.loaded = true
          console.log(this.events)
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
  History(){
    let id = localStorage.getItem('userId')
    this.apiservice.getbookedEvents(id).subscribe(
      result=>{
        if(result.data.length > 0){
          this.history = result.data;
          console.log(this.history)
          for(var i=0;i<result.data.length;i++){
            var difference = new Date().getTime() - new Date(this.history[i].date).getTime();
            var daysDifference = Math.floor(difference/1000/60/60/24);
            difference -= daysDifference*1000*60*60*24

            var hoursDifference = Math.floor(difference/1000/60/60);
            difference -= hoursDifference*1000*60*60
            this.time.push(hoursDifference > 24 ? true:false);
            //  var temp=this.events[this.history.EventId-1],this.history[i];
            //  this.historyevents.push(temp)
            // console.log(this.events[this.history.EventId-1].Ename)
            // this.historyevents[i].id = this.history.transId;
            // this.historyevents[i].Ename = this.events[this.history.EventId].Ename;
            // this.historyevents[i].description = this.events[this.history.EventId].description;
            // this.historyevents[i].Edomine = this.events[this.history.EventId].Edomine;
            // this.historyevents[i].Ecity = this.events[this.history.EventId].Ecity;
            // this.historyevents[i].Edate = this.events[this.history.EventId].Edate;
            // this.historyevents[i].Eprice = this.events[this.history.EventId].Eprice;
            // this.historyevents[i].bookked = this.history.date;
            
           }
           console.log(this.history)

        }
        else if(result.data.length == 0){
          this.errmsg="No booking done yet";
        }
        else{
          this.errmsg = "Somthing went wrong";
        }
      }
    )
  }
  Book(i){
    let data={
      userId:localStorage.getItem('userId'),
      EventId:this.events[i].eventId,
      date:new Date(),
    }
    this.apiservice.booking(data).subscribe(
      result=>{
        if(result.data == 'success'){
          this.msgresult="Booking Successful"
          $("#add").modal('show');
          this.allEvents();
        }else{
          $("#error").modal('show');
        }
      }
    )
  }
  cancel(i){
    let data={
      TransId:this.history[i].transId,
      userId:Number(localStorage.getItem('userId')),
      EventId:this.history[i].EventId,
    }
    console.log(data)
    this.apiservice.cancelbooking(this.history[i].transId).subscribe(
      result=>{
        if(result.data){
          this.msgresult=result.data
          $("#add").modal('show');
          this.History();
        }
        else{
          $("#error").modal('show');
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
