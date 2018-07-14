import { Injectable } from '@angular/core';
import { ApiService } from '../api/api';
import 'rxjs/Rx';
@Injectable()
export class SellerProductService 
{
    constructor(private apiService: ApiService) {}
    getSellerProductList(cat_id)
    {
        return this.apiService.post('/sellersproduct.php',{action:"sellersproduct",cat_id:cat_id});
    }
}