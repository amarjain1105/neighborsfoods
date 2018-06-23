import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { LoginService } from '../pages/login/loginService';
import { RegisterService } from '../pages/register/registerService';
import { ApiService } from '../pages/api/api';

import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { SellerPage } from '../pages/sellers/seller';
import { SellerProductPage } from '../pages/sellersproduct/sellersproduct';
import { HeaderPage } from '../pages/header/header';
import { CartPage } from '../pages/cart/cart';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,RegisterPage,
    SellerPage,
    SellerProductPage,
    HeaderPage,
    CartPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    BrowserModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    SellerPage,
    SellerProductPage,
    HeaderPage,
    CartPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoginService,
    RegisterService,
    ApiService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
