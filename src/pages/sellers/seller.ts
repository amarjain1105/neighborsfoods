import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SellerProductPage } from '../sellersproduct/sellersproduct';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { SellerService } from './sellerService';
import { SellerModel } from './sellerModel';
import { URL_BASE } from '../api/config';
//import { HeaderPage } from '../header/header';
//import { AboutPage } from '../about/about';

@Component({
  selector: 'page-seller',
  templateUrl: 'seller.html'
})
export class SellerPage {
  header_data:any;
  api_url: string = URL_BASE;
  cat_id:any;
  sellerList:any;
  constructor(public navCtrl: NavController,public navParams: NavParams,public mservice:SellerService) {
    this.header_data={ismenu:true, ishome:false, title:"Seller", hideIcon:false};
    this.cat_id = navParams.get('param1'); 
    //console.log(this.cat_id);
    this.getdata(this.cat_id);
  }
  getdata(cat_id)
  {
    this.mservice.getSellerList(cat_id).subscribe((response:any)=>
    {
      if(response.status)
      {
        var modelArray              = new Array<SellerModel>();
        for(var i = 0; i< response.data.length; i++)
        {
            var model               = new SellerModel();
          
            model.seller_id         = response.data[i]['seller_id'];
            model.seller_name       = response.data[i]['seller_name'];
            model.seller_user_id    = response.data[i]['seller_user_id'];
            model.cat_id            = response.data[i]['cat_id'];
            model.seller_status     = response.data[i]['seller_status'];
            model.seller_type       = response.data[i]['seller_type'];
            model.seller_image      = response.data[i]['seller_image'];
            model.seller_pro_image  = response.data[i]['seller_pro_image'];
            model.target            = response.data[i]['target'];

            modelArray.push(model);
        }
        this.sellerList = modelArray;
      }
    });
  }
  sellerproduct(data)
  {
    this.navCtrl.push(SellerProductPage);
  }

  doRefresh(refresher) 
  {
    this.getdata(this.cat_id);
    setTimeout(() =>
     {
      refresher.complete();
     }, 2000);
  }
}
