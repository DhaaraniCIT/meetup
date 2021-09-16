import { Injectable } from '@angular/core';
import { ApiService } from "../../config/api.service";
import { ConfigService } from "../../config/config.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apiService: ApiService, private configService: ConfigService) { }

  login(email: string, password: string){
    return this.apiService.post(this.configService.loginUrl,{email,password});
  }

  signup(data){
    return this.apiService.post(this.configService.signUpUrl,data);
  }
  captcha(){
    return this.apiService.get(this.configService.getCapchaUrl);
  }

  userById(id){
    return this.apiService.get(this.configService.viewabyidUrl+'/'+id)
  }

  addEvent(data){
    return this.apiService.post(this.configService.addEventUrl,data);
  }

  getAllEvents(){
    return this.apiService.get(this.configService.getAlleventsUrl);
  }
  getbookedEvents(id){
    return this.apiService.get(this.configService.getUsereventsUrl+'/'+id);
  }

  booking(data){
    return this.apiService.post(this.configService.bookingUrl,data);
  }

  cancelbooking(data){
    return this.apiService.delete(this.configService.cancelEventUrl+'/'+data);
  }
}
