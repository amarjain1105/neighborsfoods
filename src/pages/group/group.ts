import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { GroupService } from './groupService';
import { GroupModel } from './groupmodel';
import { AdMobPro } from '@ionic-native/admob-pro';

@Component({
    selector: 'page-group',
    templateUrl: 'group.html'
})


export class GroupPage 
{
    header_data:any;
    section: string = 'one';
    somethings: any = new Array(20);
    items: Object[] = [];
    username:any;
    joinGrouplist:Object[] = [];
    
    constructor(public navCtrl: NavController,public mservice: GroupService,public alertCtrl: AlertController, public toastCtrl: ToastController, public AdMob: AdMobPro) 
    {
        this.header_data            = {ismenu:true,ishome:false,title:"Group",hideIcon:false, 
                                    itemsInCart:localStorage.getItem('cartlength')};
        this.getdata();
        this.showBanner();
        this.joinGroupdata();
        this.username = localStorage.getItem("username");
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
            handler: data => 
            {
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
                    this.mservice.createGroup(data.group_name,0).subscribe((response:any) =>
                    {
                        if(response.status)
                        {
                            this.getdata();
                        }
                    })
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

    getdata()
    {
        this.mservice.createGroup('',1).subscribe((response:any) =>
        {
            if(response.status)
            {
                var modelArray = new Array<GroupModel>();
                for(var i = 0; i< response.data.length; i++)
                {
                    var model = new GroupModel();
                    model.g_id = response.data[i]['g_id'];
                    model.g_name = response.data[i]['g_name'];
                    model.g_status = response.data[i]['g_status'];
                    model.u_email = response.data[i]['u_email'];
                    modelArray.push(model);
                }
                this.items = modelArray;
               
            }
            else
            {
                console.log(response.message);
            }
        })
    }
    showBanner() 
    {
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

    addGroup(data)
    {
        this.mservice.joinGroup(data,0).subscribe((response:any) =>
        { 
            if(response.status)
            {
                this.joinGroupdata()
            }
        }) 
    }    
    joinGroupdata()
    {
        this.mservice.joinGroup('',1).subscribe((response:any) =>
        {
            if(response.status)
            {
                var modelArray = new Array<GroupModel>();
                for(var i = 0; i< response.data.length; i++)
                {
                    var model = new GroupModel();
                    model.g_id = response.data[i]['g_id'];
                    model.g_name = response.data[i]['g_name'];
                    model.g_status = response.data[i]['g_status'];
                    model.u_email = response.data[i]['u_email'];
                    model.add_u_email = response.data[i]['add_u_email'];
                    modelArray.push(model);
                }
                this.joinGrouplist = modelArray;
               
                for(var i = 0, l = this.items.length; i < l; i++) {
                    for(var j = 0, ll = this.joinGrouplist.length; j < ll; j++) {
                        if(this.items[i]['g_name'] === this.joinGrouplist[j]['g_name']) {
                            this.items.splice(i, 1);
                        }
                    }
                }
            }
            else
            {
                console.log(response.message);
            }
        })
    }
    
    deleteGroup(data)
    {

    }

        
}