import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import { Events } from "ionic-angular/util/events";
import { LoadingController } from "ionic-angular/components/loading/loading-controller";
import { ViewController } from "ionic-angular/navigation/view-controller";
import { NavParams } from "ionic-angular/navigation/nav-params";
import { SellerProductModel } from "../sellersproduct/SellerproductModel";
import { URL_BASE } from "../api/config";
import { AdMobPro } from "@ionic-native/admob-pro";

@Component({
  selector: 'page-productdetail',
  templateUrl: 'productdetail.html'
})
export class ProductDetailPage {
  header_data:any;
  api_url: string = URL_BASE;
  model                   = new SellerProductModel();
  constructor(public navCtrl: NavController, public viewCtrl : ViewController ,public navParams: NavParams
    , public AdMob: AdMobPro) {
  
    this.showBanner();
  }
  public closeModal(){
      this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    this.model.p_id              = this.navParams.get('p_id');
    this.model.p_name            = this.navParams.get('p_name');
    this.model.p_price           = this.navParams.get('p_price');
    this.model.p_code            = this.navParams.get('p_code');
    this.model.p_cat_id          = this.navParams.get('p_cat_id');
    this.model.p_description     = this.navParams.get('p_description');
    this.model.p_status          = this.navParams.get('p_status');
    this.model.s_id              = this.navParams.get('s_id');
    this.model.p_menu            = this.navParams.get('p_menu');
    this.model.p_image           = this.navParams.get('p_image');
    this.model.p_type_of_food    = this.navParams.get('p_type_of_food');
    this.model.day               = this.navParams.get('day');
    this.model.time              = this.navParams.get('time');
    this.model.target            = this.navParams.get('target');
    console.log('ionViewDidLoad ModalPage');
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