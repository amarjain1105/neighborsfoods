import { Injectable } from '@angular/core';
import { ApiService } from '../api/api';
import 'rxjs/Rx';
@Injectable()
export class RegisterService 
{
    constructor(private apiService: ApiService) {}
    getRegister(remail,rpassword,rmob ,rfullname)
    {
        return this.apiService.post('/registration.php',{action:"registration",name:rfullname,email:remail
    ,mblno:rmob,password:rpassword});
    }
}