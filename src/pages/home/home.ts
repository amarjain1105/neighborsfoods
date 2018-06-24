import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SellerPage } from '../sellers/seller';
import { HomeModel } from './homemodel';
import { HomeService } from './homeServics';
import { URL_BASE } from '../api/config';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  header_data:any;
  api_url: string = URL_BASE;
  category_item: Object[] = []
  constructor(public navCtrl: NavController, public mservisecat: HomeService) 
  {
    this.header_data            = {ismenu:true,ishome:false,title:"Home",hideIcon:false};
    this.getdata();
  }

  getdata()
  {
    this.mservisecat.getcategory().subscribe((response:any) =>
    {
      if(response.status)
      {
        var modelArray            = new Array<HomeModel>();
        for(var i = 0; i< response.data.length; i++)
        {
            var model             = new HomeModel();
            model.cat_id          = response.data[i]['cat_id'];
            model.cat_image       = response.data[i]['cat_image'];
            model.cat_name        = response.data[i]['cat_name'];
            model.target          = response.data[i]['target'];
            modelArray.push(model);
        }
        this.category_item        = modelArray;
      }
    });
  }

  seller(data)
  {
    this.navCtrl.push(SellerPage, {
      param1: data.cat_id
  });
  }
  doRefresh(refresher) 
  {
    this.getdata();
    setTimeout(() => {      
      refresher.complete();
    }, 2000);
  }
}
