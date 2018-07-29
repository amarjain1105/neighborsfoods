import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ItemModel } from './Itemodel';
import { AdMobPro } from '@ionic-native/admob-pro';


@Component({
    selector: 'page-cart',
    templateUrl: 'cart.html',
    animations: [
        trigger('cartBadge', [
            state('idle', style({
                opacity: '0.3',
                transform: 'scale(1)'
            })),
            state('adding', style({
                opacity: '1',
                transform: 'scale(1.3)'
            })),
            transition('idle <=> adding', animate('300ms linear')),
            transition('void => *', [
                style({transform: 'translateX(200%)'}),
                animate('300ms ease-in-out')
            ])
        ]),
        trigger('addButton', [
            state('idle', style({
                opacity: '0.3'
            })),
            state('adding', style({
                opacity: '1',
                fontWeight: 'bold'
            })),
            transition('idle <=> adding', animate('300ms linear')),
            transition('void => *', [
                style({transform: 'translateX(200%)'}),
                animate('300ms ease-in-out')
            ])
        ])
    ]
})
export class CartPage {

    items: Object[] = []
    itemsInCart: Object[] = [];
    cartBadgeState: string = 'idle';

    constructor(private navCtrl: NavController, private changeDetector: ChangeDetectorRef, public AdMob:AdMobPro) {

        var modelArray = new Array<ItemModel>();
        for(var i = 0; i< 10; i++)
        {
            var model = new ItemModel();
            model.id = i;
            model.title = "Something"+i;
            model.quantityInCart = 0,
            model.addButtonState = 'idle'
            model.flag = false;
            modelArray.push(model);
        }
        this.items = modelArray;

        this.showBanner();
    }

    addToCart(item, index){
        item.quantityInCart += 1;
        this.itemsInCart.push(item);        
        if (index != -1) 
        {
            item.flag = true;
        }
        item.addButtonState = 'adding';
        this.cartBadgeState = 'adding';
        this.changeDetector.detectChanges();

    }

    addcount(item)
    {
        console.log(this.itemsInCart[0]['title']);
        item.quantityInCart += 1;
        item.addButtonState = 'adding';
        this.cartBadgeState = 'adding';
    }

    removecount(item, i)
    {
        item.quantityInCart -= 1;
        if(item.quantityInCart == 0)
        {
            var index = this.itemsInCart.indexOf(item);
            this.itemsInCart.splice(index, 1);
            item.flag = false;
        }
    }

    addToCartFinished(item){
        this.cartBadgeState = 'idle';
        item.addButtonState = 'idle';
    }

    clickCart(itemsInCart)
    {
        console.log(itemsInCart);
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
