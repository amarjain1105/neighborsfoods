import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SellerPage } from '../sellers/seller';
import { HomeModel } from './homemodel';
import { HomeService } from './homeServics';
import { URL_BASE } from '../api/config';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Network } from '@ionic-native/network';
import { SellerProductPage } from '../sellersproduct/sellersproduct';
import { AdMobPro } from '@ionic-native/admob-pro';

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
    public network: Network,public AdMob:AdMobPro) 
  {
    this.header_data            = {ismenu:true,ishome:false,title:"Home",hideIcon:false, 
                                    itemsInCart:localStorage.getItem('cartlength')};
    this.showBanner();
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
    //this.showRewardVideoAds();
    this.navCtrl.push(SellerProductPage, {
      param1: data.cat_id
  });
  }
  doRefresh(refresher) 
  {
    this.getdata();
    this.launchInterstitial();
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

  // admob code

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

launchInterstitial() {

  this.AdMob.prepareInterstitial({
    adId: 'ca-app-pub-7502977873670680/7318106062',
    autoShow: true
  })

}

showRewardVideoAds(){
  this.AdMob.prepareRewardVideoAd({
    adId: 'ca-app-pub-7502977873670680/6910486927',
    autoShow: true
  })
}
}
