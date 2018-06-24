import { Injectable } from '@angular/core';
import { ApiService } from '../api/api';
import 'rxjs/Rx';
@Injectable()
export class SellerService 
{
    constructor(private apiService: ApiService) {}
    getSellerList(catId)
    {
        return this.apiService.post('/sellers.php',{action:"sellers",cat_id:catId});
    }
}