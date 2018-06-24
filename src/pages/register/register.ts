import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";
import { RegisterService } from "./registerService";
import { ToastController } from "ionic-angular/components/toast/toast-controller";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  header_data:any;
  remail:string;
  rpassword:string;
  rmob:number;
  rfullname:string;
  constructor(public nav: NavController,public toastCtrl: ToastController,private mservice: RegisterService) 
  {
    this.header_data={ismenu:true,ishome:false,title:"Registration",hideIcon:false};
  }

  // register and go to home page
  register() 
  {
    if(this.remail == undefined || this.rpassword == undefined || this.rmob == undefined || this.rfullname == undefined )
    {
      let toast = this.toastCtrl.create({
        message: 'All fields are required!',
        duration: 3000,
        position: 'bottom',
        cssClass: 'dark-trans',
        closeButtonText: 'OK',
        showCloseButton: true
      });
      toast.present();
    }
    else
    {
    this.mservice.getRegister(this.remail,this.rpassword,this.rmob ,this.rfullname).subscribe((response:any) =>
    {
      console.log(response);
      if(response.status)
      {
        alert(response.message);
      }
      else
      {
        alert(response.message);
      }
    });
  }
  }

  // go to login page
  login() 
  {
    this.nav.setRoot(LoginPage);
  }
}
