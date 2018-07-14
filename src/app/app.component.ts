import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { Icon } from 'ionic-angular/components/icon/icon';
import { CartPage } from '../pages/cart/cart';
import { Events } from 'ionic-angular/util/events';
import { SellerPage } from '../pages/sellers/seller';
import { ProfilePage } from '../pages/profile/profile';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  flag = true;
  rootPage: any = HomePage;
  username: any;
  logindata:any;
  name:any;

  pages: Array<{title: string, component: any, icon: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public events: Events) {
    this.initializeApp();    
    if(localStorage.getItem("logindata"))
    {
      this.logindata = localStorage.getItem("logindata");
      this.name = localStorage.getItem("name");
      this.username = this.logindata.name;
      this.loggedIn(localStorage.getItem("logindata"));
      this.flag = false;
    }
    else
    {
      this.logoutlist();
    }

    events.subscribe('user:login', (data) => {
      this.loggedIn(data.name);
      this.flag = false;
    });
    // used for an example of ngFor and navigation
    

  }

logoutlist()
{
  this.pages = [
    { title: 'Home', component: HomePage, icon: 'home' },
    { title: "Login/Registration", component: LoginPage, icon: 'contact'},
    { title: 'Chefs', component: SellerPage, icon: 'people' }
  ];
}

  logout()
  {
    this.logoutlist();
    localStorage.removeItem("logindata");
    this.flag = true;
    this.nav.setRoot(HomePage);
  }

  editprofile()
  {
    this.nav.push(ProfilePage)
  }
  loggedIn(data) {
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Seller', component: SellerPage, icon: 'home' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
