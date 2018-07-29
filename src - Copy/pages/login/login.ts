import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import { LoginService } from "./loginService";
import { Events } from "ionic-angular/util/events";
import { LoadingController } from "ionic-angular/components/loading/loading-controller";
import { OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,ValidatorFn,AbstractControl } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage  implements OnInit {
  header_data:any;
  loading;
  user: FormGroup;
  constructor(public nav: NavController, public alertCtrl: AlertController, public toastCtrl: ToastController,
    public mservice: LoginService, public events: Events, public loadingCtrl: LoadingController) {
    this.header_data={ismenu:true,ishome:false,title:"Login",hideIcon:false};
  
  }
  ngOnInit() {

    this.user = new FormGroup({
    email: new FormControl('', [Validators.email]),
    password:new FormControl('', [])
    });
    
    }
  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  login(user) {
    if(user !=undefined)
    {
      if(user.value.email == "" || user.value.email == undefined)
      {
        let toast = this.toastCtrl.create({
          message: 'Enter Username / Email Id ',
          duration: 2000,
          position: 'bottom',
          cssClass: 'dark-trans',
          closeButtonText: 'OK',
          showCloseButton: true
        });
        toast.present();
      }
      else if(user.value.password == "" || user.value.password == undefined)
      {
        let toast = this.toastCtrl.create({
          message: 'Enter Password',
          duration: 3000,
          position: 'top',
          cssClass: 'dark-trans',
          closeButtonText: 'OK',
          showCloseButton: true
        });
        toast.present();
      }
      else
      {
        this.ShowLoader();
        this.mservice.getLogin(user.value.email,user.value.password).subscribe((response:any) =>
        {
          this.HideLoader();
          if(response.status)
          {
            console.log(response.data)
            console.log(JSON.stringify(response.data))
            localStorage.setItem("logindata", JSON.stringify(response.data));
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("mobile", response.data.mobile);
            localStorage.setItem("u_id", response.data.id);
            this.events.publish('user:login', response.data);
            this.nav.setRoot(HomePage);
          }
          else
          {
            let alert = this.alertCtrl.create({
              title:response.message,
              buttons: ['Ok']
            });
            alert.present();
          }
        });
      }
    }
  }
  forgotPass() {
    let forgot = this.alertCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            if(data.email =="")
            {
              let toast = this.toastCtrl.create({
                message: "Enter valid email address",
                duration: 3000,
                position: 'bottom',
                cssClass: 'dark-trans',
                closeButtonText: 'OK',
                showCloseButton: true
              });
              toast.present();
              return false;
            }
            else
            {
              var error_message="";
                this.mservice.getforgotpassword(data.email).subscribe((response:any)=>
                {
                  if(response.status)
                  {
                    error_message = response.message; 
                  }
                  else
                  {
                    error_message = response.message;
                  }

                  let toast = this.toastCtrl.create({
                    message: error_message,
                    duration: 3000,
                    position: 'bottom',
                    cssClass: 'dark-trans',
                    closeButtonText: 'OK',
                    showCloseButton: true
                  });
                  toast.present();
                });
            }
            
          }
        }
      ]
    });
    forgot.present();
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

}
