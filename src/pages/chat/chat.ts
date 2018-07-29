import { Component} from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';
import { AdMobPro } from '@ionic-native/admob-pro';

@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html'
})


export class ChatPage 
{
    nickname:string;
    header_data:any;
    messages = [{'from':"Akshay", 'text': "hello"},{'from':"Amar", 'text': "hello"}]
    constructor(public navCtrl: NavController,public alertCtrl: AlertController, 
        public toastCtrl: ToastController, public AdMob: AdMobPro) 
    {
        this.header_data            = {ismenu:true,ishome:false,title:"Chat",hideIcon:false, 
                                    itemsInCart:localStorage.getItem('cartlength')};
        this.nickname = 'Amar';
        this.showBanner();
    }

    showRewardVideoAds(){
        this.AdMob.prepareRewardVideoAd({
          adId: 'ca-app-pub-7502977873670680/6910486927',
          autoShow: true
        })
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