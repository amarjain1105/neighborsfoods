import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ItemModel } from '../cart/Itemodel';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { URL_BASE } from '../api/config';
import { SellerProductModel } from './SellerproductModel';
import { SellerProductService } from './SellerproductSevice';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ProductDetailPage } from '../productDetail/productdetail';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-sellersproduct',
  templateUrl: 'sellersproduct.html'
//   ,animations: [
//     trigger('cartBadge', [
//         state('idle', style({
//             opacity: '0.3',
//             transform: 'scale(1)'
//         })),
//         state('adding', style({
//             opacity: '1',
//             transform: 'scale(1.3)'
//         })),
//         transition('idle <=> adding', animate('300ms linear')),
//         transition('void => *', [
//             style({transform: 'translateX(200%)'}),
//             animate('300ms ease-in-out')
//         ])
//     ]),
//     trigger('addButton', [
//         state('idle', style({
//             opacity: '0.3'
//         })),
//         state('adding', style({
//             opacity: '1',
//             fontWeight: 'bold'
//         })),
//         transition('idle <=> adding', animate('300ms linear')),
//         transition('void => *', [
//             style({transform: 'translateX(200%)'}),
//             animate('300ms ease-in-out')
//         ])
//     ])
// ]
})


export class SellerProductPage {
  header_data:any;
  items: Object[] = []
  itemsInCart: Object[] = [];
  tempitemsInCart:Object[] = [];
  cartBadgeState: string = 'idle';
  api_url: string = URL_BASE;
  cat_id:any; 
  sellerproductList=[];
  loading;
  refresher;
  constructor(public navCtrl: NavController,public modalCtrl:ModalController, private changeDetector: ChangeDetectorRef,public navParams: NavParams,
public mservice:SellerProductService, public loadingCtrl: LoadingController) 
  {
    this.header_data            = {ismenu:true,ishome:false,title:"Product",hideIcon:false, 
                                    itemsInCart:localStorage.getItem('cartlength')};
      this.cat_id = navParams.get('param1');
  }

  getdata(cat_id)
  {
    this.ShowLoader();
    this.mservice.getSellerProductList(cat_id).subscribe((response:any)=>
    {
      console.log(response)
      this.HideLoader();
      if(this.refresher != undefined)
        this.refresher.complete();
      if(response.status)
      {
        var modelArray              = new Array<SellerProductModel>();
        for(var i = 0; i< response.data.length; i++)
        {
            var model                   = new SellerProductModel();

            model.p_id              = response.data[i]['p_id'];
            model.p_name            = response.data[i]['p_name'];
            model.p_price           = response.data[i]['p_price'];
            model.p_code            = response.data[i]['p_code'];
            model.p_cat_id          = response.data[i]['p_cat_id'];
            model.p_description     = response.data[i]['p_description'];
            model.p_status          = response.data[i]['p_status'];
            model.s_id              = response.data[i]['s_id'];
            model.p_menu            = response.data[i]['p_menu'];
            model.p_image           = response.data[i]['p_image'];
            model.p_type_of_food    = response.data[i]['p_type_of_food'];
            model.day               = response.data[i]['day'];
            model.time              = response.data[i]['time'];
            model.target            = response.data[i]['target'];
            model.quantityInCart    = 0;
            model.flag              = false;
            modelArray.push(model);
        }
        this.sellerproductList = modelArray;
      }
      else
      {
        this.sellerproductList = [];
        console.log(this.sellerproductList.length);
      }
      var item_cart = JSON.parse(localStorage.getItem('cartitem'));
      this.itemsInCart = [];
      for(var i =0 ; i< item_cart.length; i++)
      {
        this.itemsInCart.push(item_cart[i])
      }
    });
  }
  
  ionViewCanEnter()
  {
    this.header_data            = {ismenu:true,ishome:false,title:"Product",hideIcon:false, 
    itemsInCart:localStorage.getItem('cartlength')};
    this.getdata(this.cat_id);
  } 

 
  
  doRefresh(refresher) 
  {
    this.getdata(this.cat_id);
    this.refresher = refresher;
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

  productdetail(data)
  {
    console.log(data);
    var modalPage = this.modalCtrl.create(ProductDetailPage,data);
    modalPage.present();
  }
  

  addToCart(item, index){
    item.quantityInCart = 1;
    this.itemsInCart.push(item);   
    console.log(JSON.stringify(this.itemsInCart))
 
    var clength = this.itemsInCart.length; 
    localStorage.setItem("cartlength", clength.toString())
    localStorage.setItem("cartitem", JSON.stringify(this.itemsInCart))
    this.cartRefresh();  

    if (index != -1) 
    {
        item.flag = true;
    }
    item.addButtonState = 'adding';
    this.cartBadgeState = 'adding';
    this.changeDetector.detectChanges();

}
// Page back
cartRefresh()
{
  this.header_data            = {ismenu:true,ishome:false,title:"Product",hideIcon:false, 
                                  itemsInCart:localStorage.getItem('cartlength'),
                                  cartitem:localStorage.getItem("cartitem")};
 
}

addToCartFinished(item){
    this.cartBadgeState = 'idle';
    item.addButtonState = 'idle';
}

clickCart(itemsInCart)
{
    console.log(itemsInCart);
}



}
