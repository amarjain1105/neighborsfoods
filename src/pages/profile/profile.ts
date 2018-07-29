import { NavController } from "ionic-angular/navigation/nav-controller";
import {Component} from "@angular/core";
import { LoginService } from "../login/loginService";
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { AdMobPro } from "@ionic-native/admob-pro";

@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
  })
  export class ProfilePage {
    header_data:any;
    username:string;
    name:string;
    mobile:string;
    constructor(public nav: NavController,public loginservice: LoginService,public alertCtrl:AlertController, public AdMob: AdMobPro) 
    {
      this.header_data={ismenu:true,ishome:false,title:"Edit Profile",hideIcon:false};
      this.username = localStorage.getItem('username');
      this.name = localStorage.getItem('name');
      this.mobile = localStorage.getItem('mobile');
      this.showBanner();
    }

    updateProfile()
    {
      this.loginservice.getUpdateProfile(this.mobile).subscribe((response:any) =>
      {
        if(response.status)
        {
          
          let alert = this.alertCtrl.create({
            title:response.message,
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
    showBanner() {
        
      this.AdMob.createBanner({
          adId: 'ca-app-pub-7502977873670680/1036193776',
          isTesting: false,
          autoShow: true,
          adSize:'CUSTOM',  width:300, height:50, 
          overlap:true, 
          // position:this.AdMob.AD_POSITION.POS_XY, x:100, y:200, 
          position:this.AdMob.AD_POSITION.BOTTOM_CENTER
      })
    
    }
}