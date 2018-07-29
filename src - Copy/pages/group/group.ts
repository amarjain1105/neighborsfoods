import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';

@Component({
    selector: 'page-group',
    templateUrl: 'group.html'
})


export class GroupPage 
{
    header_data:any;
    section: string = 'one';
    somethings: any = new Array(20);
    constructor(public navCtrl: NavController,public alertCtrl: AlertController, public toastCtrl: ToastController) 
    {
    this.header_data            = {ismenu:true,ishome:false,title:"Group",hideIcon:false, 
                                    itemsInCart:localStorage.getItem('cartlength')};
    
    }
    createGroup() 
    {
        let createGroupAlert = this.alertCtrl.create({
        title: 'Create Group',
        inputs: [
        {
            name: 'group_name',
            placeholder: 'Enter you group name',
            type: 'text'
        },
        ],
        buttons: [
        {
            text: 'Cancel',
            handler: data => {
            console.log('Cancel clicked');
            }
        },
        {
            text: 'Send',
            handler: data => 
            {
                console.log('Send clicked');
                if(data.group_name =="")
                {
                    let toast = this.toastCtrl.create({
                    message: "Enter Group Name",
                    duration: 2000,
                    position: 'bottom',
                    cssClass: 'dark-trans',
                    closeButtonText: 'OK',
                    showCloseButton: true
                    });
                    toast.present();
                    return false;
                }
                else
                {

                }
            }
        }]
        });
    createGroupAlert.present();
    }

    openChat(id)
    {
        this.navCtrl.push(ChatPage)
    }

        
}