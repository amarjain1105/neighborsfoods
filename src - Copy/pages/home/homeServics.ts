import { Injectable } from '@angular/core';
import { ApiService } from '../api/api';
import 'rxjs/Rx';
@Injectable()
export class HomeService 
{
    constructor(private apiService: ApiService) {}
    getcategory()
    {
        return this.apiService.post('/category.php',{action:"category"});
    }
}