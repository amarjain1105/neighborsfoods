import { NavController } from "ionic-angular/navigation/nav-controller";
import {Component} from "@angular/core";
import { LoginService } from "../login/loginService";
import { AlertController } from "ionic-angular/components/alert/alert-controller";

@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
  })
  export class ProfilePage {
    header_data:any;
    username:string;
    name:string;
    mobile:string;
    constructor(public nav: NavController,public loginservice: LoginService,public alertCtrl:AlertController) 
    {
      this.header_data={ismenu:true,ishome:false,title:"Edit Profile",hideIcon:false};
      this.username = localStorage.getItem('username');
      this.name = localStorage.getItem('name');
      this.mobile = localStorage.getItem('mobile');
    }

    updateProfile()
    {
      this.loginservice.getUpdateProfile(this.mobile).subscribe((response:any) =>
      {
        if(response.status)
        {
          
          let alert = this.alertCtrl.create({
            title: response.message,
            message:'<ion-icon name="contact"></ion-icon>aa',
            buttons: ['Ok']
          });
          alert.present();
          localStorage.setItem('mobile',this.mobile)
        }
        else
        {
          let alert = this.alertCtrl.create({
            title: response.message,
            buttons: ['Ok']
          });
          alert.present();
 
        }
      });
    }
}