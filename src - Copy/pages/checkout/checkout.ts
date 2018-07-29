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

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html'
})
export class CheckoutPage {
    cartitemarr;
    cartlength;
    api_url: string = URL_BASE;
    price = 0;

    constructor(public navCtrl: NavController, public viewCtrl : ViewController ,public navParams: NavParams) 
    {
    }

    ionViewDidLoad() 
    {
        this.cartitemarr = JSON.parse(localStorage.getItem('cartitem'));
        for(var i = 0; i<this.cartitemarr.length; i++)
        {
            var price_qty = parseInt(this.cartitemarr[i]['p_price']) * parseInt(this.cartitemarr[i]['quantityInCart']);
            this.price = this.price+price_qty;
        }
        this.cartlength = localStorage.getItem('cartlength');
        console.log(this.cartitemarr)
    }

    removeFromCart(item)
    {
        var index = this.cartitemarr.indexOf(item);
        this.cartitemarr.splice(index, 1);
        var clength = this.cartitemarr.length;
        for(var i=0; i<parseInt(item.quantityInCart); i++)
        {
            this.price = this.price-parseInt(item.p_price);
        }
        localStorage.setItem("cartlength", clength.toString());
        localStorage.setItem("cartitem", JSON.stringify(this.cartitemarr));
        this.cartlength = localStorage.getItem('cartlength');
    }

    dec(item)
    {
        item.quantityInCart -= 1;
        this.price = this.price-parseInt(item.p_price);
        localStorage.setItem("cartitem", JSON.stringify(this.cartitemarr));
        if(item.quantityInCart == 0)
        {
            var index = this.cartitemarr.indexOf(item);
            this.cartitemarr.splice(index, 1);
            var clength = this.cartitemarr.length;
            localStorage.setItem("cartlength", clength.toString());
            localStorage.setItem("cartitem", JSON.stringify(this.cartitemarr));
            this.cartlength = localStorage.getItem('cartlength');
            item.flag = false;
        }
    }

    inc(item)
    {
        item.quantityInCart += 1;
        this.price = this.price+parseInt(item.p_price);
        item.addButtonState = 'adding';
        localStorage.setItem("cartitem", JSON.stringify(this.cartitemarr))
    }
}