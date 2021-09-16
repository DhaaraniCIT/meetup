import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { ConfirmedValidator } from './confirmed.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  failure=false
  errmsg:any
  img: any;
  token: any;
  userName: any;

  constructor(private formBuilder:FormBuilder,private router:Router,private apiservice:LoginService,private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getcaptcha()
    this.registerForm = this.formBuilder.group({
      firstname:['',[Validators.required]],
      email:['',[Validators.required, Validators.pattern('^([a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.\_\-])([a-zA-Z\.]+)$')]],
      password:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirm_password:['',[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      captcha:['',[Validators.required]],
    },{ validator: ConfirmedValidator('password', 'confirm_password')})

    this._route.paramMap.subscribe(paraMap => {
      this.token = paraMap.get('token');
      this.userName = paraMap.get('userName');
    }
      );
  }
  
  get f() {return this.registerForm.controls;}

  signup(){
      let data={
        name:this.f.firstname.value,
        email:this.f.email.value,
        password:this.f.password.value,
        captcha:this.f.captcha.value,
        recaptcha:localStorage.getItem('captcha')
      }
      this.apiservice.signup(data).subscribe(
        result=>{
          if(result.data){
            result=result.data
            localStorage.setItem('userId', result.userId);
            localStorage.setItem('userpic', result.profilePictureURL);
            localStorage.setItem('userName', result.name);
            localStorage.setItem('isUser','true')
            window.sessionStorage.setItem('TOKEN_KEY', result.token);
            this.router.navigate([localStorage.getItem('userName') + '/Dashboard']);
          }
          else{
            this.failure=true
            this.errmsg=result.error;
          }
        }
      )
  }

  getcaptcha(){
    this.apiservice.captcha().subscribe(
      result=>{
        localStorage.setItem('captcha',result.data)
        this.img='data:image/png;base64,'+result.img
      }
    )
  }

}
