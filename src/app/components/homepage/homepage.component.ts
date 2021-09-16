import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  headerColor_bk_white: boolean;
  userId = false
  firstname :any;
  constructor() { }

  ngOnInit(): void {
    // if(localStorage.getItem('userId')){
    //   this.firstname= localStorage.getItem('userId')
    // }

  }
  onWindowScroll(e) {
  
    if (window.pageYOffset > 64) {
      this.headerColor_bk_white = true;
    } else {
      this.headerColor_bk_white = false;
    }
  }
  
}
