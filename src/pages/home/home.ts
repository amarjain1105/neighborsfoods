import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SellerPage } from '../sellers/seller';
//import { HeaderPage } from '../header/header';
//import { AboutPage } from '../about/about';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  header_data:any;
  list = [1,2,3,4,5,6,7]
  constructor(public navCtrl: NavController) {
    this.header_data={ismenu:true,ishome:false,title:"Home",hideIcon:false};
  }

  seller(data)
  {
    //alert('Hello');
    this.navCtrl.push(SellerPage);
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.list = [1,2]
      refresher.complete();
    }, 2000);
  }
}
