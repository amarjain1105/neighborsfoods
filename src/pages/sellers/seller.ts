import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SellerProductPage } from '../sellersproduct/sellersproduct';
//import { HeaderPage } from '../header/header';
//import { AboutPage } from '../about/about';

@Component({
  selector: 'page-seller',
  templateUrl: 'seller.html'
})
export class SellerPage {
  header_data:any;
  list = [1,2,3,4,5,6,7]
  constructor(public navCtrl: NavController) {
    this.header_data={ismenu:true, ishome:false, title:"Seller", hideIcon:false};
  }

  sellerproduct(data)
  {
    this.navCtrl.push(SellerProductPage);
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
