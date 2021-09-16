import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from "../login/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  failure = false;
  hide=true;
  submitted = false;
  
  constructor(private formBuilder:FormBuilder,private router:Router,private apiservice:LoginService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^([a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.\_\-])([a-zA-Z\.]+)$')]],
      password: ['',Validators.required]
    })
  }

  get f() { return this.loginForm.controls; }

  login(){
    // console.log(this.f.email.value, this.f.password.value)
    this.apiservice.login(this.f.email.value, this.f.password.value).subscribe(
      result=>{
        if (result.data ) {
            result=result.data
            localStorage.setItem('userId', result.userId);
            localStorage.setItem('userpic', result.profilePicture);
            localStorage.setItem('userName', result.name);
            localStorage.setItem('isUser','true')
            window.sessionStorage.setItem('TOKEN_KEY', result.token);
              this.router.navigate([localStorage.getItem('userName') + '/Dashboard']);
             }
            else{
             this.failure=true
            } 

    })

  }

}

