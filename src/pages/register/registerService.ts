import { Injectable } from '@angular/core';
import { ApiService } from '../api/api';
import 'rxjs/Rx';
@Injectable()
export class RegisterService 
{
    constructor(private apiService: ApiService) {}
    getRegister()
    {
        return this.apiService.post('/neighborsfood_app_server/registration',{});
    }
}