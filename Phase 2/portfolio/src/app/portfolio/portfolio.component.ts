import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {contact} from './contact';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})

export class PortfolioComponent implements OnInit {

  loginPage:boolean = true;
  profilePage:boolean =false;
  signupPage:boolean = false;

  fullname:string="";
  username:string="";
  password:string="";

  contacts:Array<contact> = new Array();
 
  loginRef = new FormGroup({
    user:new FormControl("",[Validators.required]),
    pass:new FormControl("",[Validators.required])
  })
  
  SignupRef = new FormGroup({
    firstname:new FormControl("",[Validators.required]),
    lastname:new FormControl("",[Validators.required]),
    username:new FormControl("",[Validators.required]),
    password:new FormControl("",[Validators.required])
  })

  constructor() { }

  ngOnInit(): void {
  }

  checkUser() {
    let login = this.loginRef.value
    if(login.user==this.username && login.pass==this.password){
      this.loginPage=false;
      this.profilePage=true;
    }else {
      alert("Login Failed!")
    }
    this.loginRef.reset();
  }

  showSignUp(){
    this.loginPage=false;
    this.signupPage=true;
  }

  showLogin(){
    this.loginPage=true;
    this.signupPage=false;
  }

  AddUser(){
    let Signup = this.SignupRef.value;
    this.fullname = Signup.firstname + " " + Signup.lastname;
    this.username = Signup.username;
    this.password = Signup.password; 
    this.contacts = [];
    alert("Registration Successful!");
    this.SignupRef.reset();
    this.showLogin(); 
  }

  signout(){
    this.loginPage=true;
    this.profilePage=false;
  }

  addContact(nameRef:any, phoneRef:any){
    let name = nameRef.value;
    let phone = phoneRef.value;
    let cont = new contact(name,phone);
    this.contacts.push(cont);
  }
  
}