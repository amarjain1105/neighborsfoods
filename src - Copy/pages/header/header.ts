import { Component, Input, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CheckoutPage } from '../checkout/checkout';
let headerPage : HeaderPage;
@Component({
  selector: 'page-header',
  templateUrl: 'header.html'
})
export class HeaderPage {
    header_data: any;
    constructor(public navCtrl: NavController) {}
    @Input()
    set header(header_data: any) {
      this.header_data=header_data;
    }
    get header() {
      return this.header_data;
    }
    checkout()
    {
      this.navCtrl.push(CheckoutPage);
    }
}
