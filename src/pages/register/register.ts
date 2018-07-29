import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";
import { RegisterService } from "./registerService";
import { ToastController } from "ionic-angular/components/toast/toast-controller";
import { LoadingController } from "ionic-angular/components/loading/loading-controller";
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { AdMobPro } from "@ionic-native/admob-pro";

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
  loading;
  constructor(public nav: NavController,public toastCtrl: ToastController,private mservice: RegisterService,
    public loadingCtrl: LoadingController,public alertCtrl:AlertController,public AdMob: AdMobPro) 
  {
    this.header_data={ismenu:true,ishome:false,title:"Registration",hideIcon:false};
    this.showBanner();
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
      this.ShowLoader();
      this.mservice.getRegister(this.remail,this.rpassword,this.rmob ,this.rfullname).subscribe((response:any) =>
      {
        this.HideLoader();
        console.log(response);
        if(response.status)
        {
          let toast = this.toastCtrl.create({
            message: response.message,
            duration: 3000,
            position: 'bottom',
            cssClass: 'dark-trans',
            closeButtonText: 'OK',
            showCloseButton: true
          });
          toast.present();
          this.nav.setRoot(LoginPage);
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

  // go to login page
  login() 
  {
    this.nav.setRoot(LoginPage);
  }

  ShowLoader() 
  {
      this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
      });
      this.loading.present();
  }

  HideLoader()
  {
      this.loading.dismiss();
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
