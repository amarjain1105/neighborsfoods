import { Component} from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';

@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html'
})


export class ChatPage 
{
    nickname:string;
    header_data:any;
    messages = [{'from':"Akshay", 'text': "hello"},{'from':"Amar", 'text': "hello"}]
    constructor(public navCtrl: NavController,public alertCtrl: AlertController, public toastCtrl: ToastController) 
    {
        this.header_data            = {ismenu:true,ishome:false,title:"Chat",hideIcon:false, 
                                    itemsInCart:localStorage.getItem('cartlength')};
        this.nickname = 'Amar';
    }
}