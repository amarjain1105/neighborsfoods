import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";
import { RegisterService } from "./registerService";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  header_data:any;
  constructor(public nav: NavController,private mservice: RegisterService) 
  {
    this.header_data={ismenu:true,ishome:false,title:"Registration",hideIcon:false};
  }

  // register and go to home page
  register() 
  {
    this.mservice.getRegister().subscribe((response:any) =>
    {
      console.log(response);
    });
  }

  // go to login page
  login() 
  {
    this.nav.setRoot(LoginPage);
  }
}
