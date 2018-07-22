import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SellerProductPage } from '../sellersproduct/sellersproduct';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { SellerService } from './sellerService';
import { SellerModel } from './sellerModel';
import { URL_BASE } from '../api/config';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
//import { HeaderPage } from '../header/header';
//import { AboutPage } from '../about/about';

@Component({
  selector: 'page-seller',
  templateUrl: 'seller.html'
})
export class SellerPage {
  header_data:any;
  api_url: string = URL_BASE;
  sellerList:any;
  loading;
  refresher;
  constructor(public navCtrl: NavController,public navParams: NavParams,public mservice:SellerService,
    public loadingCtrl: LoadingController) {
    this.header_data={ismenu:true, ishome:false, title:"Seller", hideIcon:false};
    //console.log(this.cat_id);
  }
  getdata()
  {
    this.ShowLoader();
    this.mservice.getSellerList().subscribe((response:any)=>
    {
      this.HideLoader();
      if(this.refresher != undefined)
        this.refresher.complete();
      if(response.status)
      {
        var modelArray              = new Array<SellerModel>();
        for(var i = 0; i< response.data.length; i++)
        {
            var model                   = new SellerModel();
            model.seller_id             = response.data[i]['seller_id'];
            model.seller_name           = response.data[i]['seller_name'];
            model.seller_address        = response.data[i]['seller_address'];
            model.seller_status         = response.data[i]['seller_status'];
            model.seller_profile_image  = response.data[i]['seller_profile_image'];
            model.seller_user_email     = response.data[i]['seller_user_email'];
            model.seller_user_mobile    = response.data[i]['seller_user_mobile'];
            model.target                = response.data[i]['target'];

            modelArray.push(model);
        }
        this.sellerList = modelArray;
      }
    });
  }
  sellerproduct(data)
  {console.log(data);
    alert();
    this.navCtrl.push(SellerProductPage, {
      param1: data.seller_user_email
  });
  }

  doRefresh(refresher) 
  {
    this.getdata();
    this.refresher = refresher;
  }

  ionViewCanEnter()
  {
    this.getdata();
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
