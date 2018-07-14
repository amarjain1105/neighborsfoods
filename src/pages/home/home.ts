import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SellerPage } from '../sellers/seller';
import { HomeModel } from './homemodel';
import { HomeService } from './homeServics';
import { URL_BASE } from '../api/config';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Network } from '@ionic-native/network';
import { SellerProductPage } from '../sellersproduct/sellersproduct';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  header_data:any;
  api_url: string = URL_BASE;
  category_item: Object[] = []
  loading;
  refresher;
  constructor(public navCtrl: NavController, public mservisecat: HomeService, public loadingCtrl:LoadingController, 
    public network: Network) 
  {
    this.header_data            = {ismenu:true,ishome:false,title:"Home",hideIcon:false, 
                                    itemsInCart:localStorage.getItem('cartlength')};

  }

  getdata()
  {
    this.ShowLoader();
    this.mservisecat.getcategory().subscribe((response:any) =>
    {
      this.HideLoader();
      if(this.refresher != undefined)
        this.refresher.complete();
      if(response.status)
      {
        var modelArray            = new Array<HomeModel>();
        for(var i = 0; i< response.data.length; i++)
        {
            var model             = new HomeModel();
            model.cat_id          = response.data[i]['cat_id'];
            model.cat_image       = response.data[i]['cat_image'];
            model.cat_name        = response.data[i]['cat_name'];
            model.target          = response.data[i]['target'];
            modelArray.push(model);
        }
        this.category_item        = modelArray;
      }
      else
      {

      }
    });
  }

  seller(data)
  {
    this.navCtrl.push(SellerProductPage, {
      param1: data.cat_id
  });
  }
  doRefresh(refresher) 
  {
    this.getdata();
    this.refresher = refresher;
  }

  ionViewDidEnter() 
  {
    // check internet connection start
    this.network.onConnect().subscribe(data => {
      alert("internet");
      this.getdata();
      console.log(data.type)
    }, error => console.error(error));
   
    this.network.onDisconnect().subscribe(data => {
      alert("onDisconnect");
      console.log(data.type)
    }, error => console.error(error));
    // check internet connection end
  }
  // Page back
  ionViewCanEnter()
  {
    this.header_data            = {ismenu:true,ishome:false,title:"Home",hideIcon:false, 
                                    itemsInCart:localStorage.getItem('cartlength')};
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
