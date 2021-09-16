import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service'


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private restapi: SharedService) { }

  private getCapchaURL = this.restapi.baseUrl+'/captcha';
  get getCapchaUrl():string{ return this.getCapchaURL }

  private loginURL = this.restapi.baseUrl+'/login';
  get loginUrl(): string{ return this.loginURL }

  private signUpURL = this.restapi.baseUrl+'/signup';
  get signUpUrl(): string{ return this.signUpURL }

  private addEventURL = this.restapi.baseUrl+'/addEvent';
  get addEventUrl(): string{ return this.addEventURL }

  private bookingURL = this.restapi.baseUrl+'/booking';
  get bookingUrl(): string{ return this.bookingURL }

  private getAlleventsURL = this.restapi.baseUrl+'/allEvents';
  get getAlleventsUrl(): string{ return this.getAlleventsURL }

  private getUsereventsURL = this.restapi.baseUrl+'/userEvents';
  get getUsereventsUrl(): string{ return this.getUsereventsURL }

  private cancelEventURL = this.restapi.baseUrl+'/cancelEvents';
  get cancelEventUrl(): string{ return this.cancelEventURL }

  private viewbyidURL = this.restapi.baseUrl+'/viewUser';
  get viewabyidUrl(): string{ return this.viewbyidURL}
}
