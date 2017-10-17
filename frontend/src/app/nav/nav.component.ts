import { Component, OnInit } from '@angular/core';
import { User } from '../user'
import { UserService } from '../user.service';
import 'rxjs/add/operator/toPromise';

import { Router } from '@angular/router'
import {IMyDrpOptions, IMyDateRangeModel} from 'mydaterangepicker';
// import { IMyDate } from "./my-date.interface";
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  currYear = (new Date()).getFullYear();
  currMonth = (new Date()).getMonth();
  currDay = (new Date()).getDate()

  private myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'mmm dd yyyy',
    disableUntil: {
      year: new Date().getFullYear(),
      month: new Date().getMonth()+1,
      day: new Date().getDate()-1,
    },
    maxYear: new Date().getFullYear()+2,
    

  
};



private model: Object = {beginDate: null,
endDate: null};
  
    constructor(private _userService: UserService, private _router: Router) { }
  
    ngOnInit() {

    }
    user = new User();
    
      pwConfirm = '';
      passwordMatch = false;
    
      regErrors = [];
    
      checkPassword() {
        if (this.user.password.length < 8) {
          this.regErrors.push("Password must be at least 8 characters");
        } 
        if (this.user.password !== this.pwConfirm) {
          this.regErrors.push("Password confirmation must match password")
        }
      }
    
      validateEmail(email) {
        var re = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/;
        if (!re.test(email)) {
          this.regErrors.push("Email must be in valid email format");
        }
      }
    
      // currUser;
    
    
      registrationAttempt() {
        console.log("HIT REG ATTEMPT")
  
        // this.regErrors = [];
        // this.checkPassword();
        // this.validateEmail(this.user.email);
        // if (this.regErrors.length > 0) {
        //   this.user = new User;
        //   this.pwConfirm = '';
        // } else {
          this._userService.regAttempt(this.user)
            .then(data => {
              console.log("DATA RESPONSE COMING BACK FROM SERVER")
              // if (data.emailError) {
              //   this.regErrors.push(data.emailError);
              //   this.user = new User;
              //   this.pwConfirm = '';
              // } else {
              //   // this.currUser = data;
              //   this._router.navigateByUrl('/choose_topics');             
              // }
              this._router.navigateByUrl('/host/register')
            })
            .catch(err => console.log(err));      
        
      }
    
      attemptedUser = {
        email: '',
        password: ''
      }
    
      loginError;
    
      loginAttempt() {
        this._userService.loginAttempt(this.attemptedUser)
          .then(resData => {
            if (resData.error) {
              this.loginError = resData.error;
            } else {
              // this.currUser = resData;
              this._router.navigateByUrl('/home');
            }
          }).catch(err => console.log(err));
    
      }
    }
