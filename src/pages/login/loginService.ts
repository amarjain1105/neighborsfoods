import { Injectable } from '@angular/core';
import { ApiService } from '../api/api';
import 'rxjs/Rx';
@Injectable()
export class LoginService 
{
    constructor(private apiService: ApiService) {}
    getLogin(email,password)
    {
        return this.apiService.post('/neighborsfood_app_server/login.php',{action:"login",email:email,password:password});
    }
}