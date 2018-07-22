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

    constructor(public navCtrl: NavController, public viewCtrl : ViewController ,public navParams: NavParams) 
    {
    }

    ionViewDidLoad() 
    {
        this.cartitemarr = JSON.parse(localStorage.getItem('cartitem'));
        this.cartlength = localStorage.getItem('cartlength');
        console.log(this.cartitemarr)
    }

    removeFromCart(item)
    {
        var index = this.cartitemarr.indexOf(item);
        this.cartitemarr.splice(index, 1);
        var clength = this.cartitemarr.length;
        localStorage.setItem("cartlength", clength.toString());
        localStorage.setItem("cartitem", JSON.stringify(this.cartitemarr));
    }

    dec(item)
    {
        item.quantityInCart -= 1;
        localStorage.setItem("cartitem", JSON.stringify(this.cartitemarr));
        if(item.quantityInCart == 0)
        {
            var index = this.cartitemarr.indexOf(item);
            this.cartitemarr.splice(index, 1);
            var clength = this.cartitemarr.length;
            localStorage.setItem("cartlength", clength.toString());
            item.flag = false;
        }
    }

    inc(item)
    {
        item.quantityInCart += 1;
        item.addButtonState = 'adding';
        localStorage.setItem("cartitem", JSON.stringify(this.cartitemarr))
    }
}