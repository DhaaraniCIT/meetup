import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  public baseUrl= 'http://127.0.0.1:5000';

    public version = 'V 0.0.1';
    public buildNumber = '1';

}
