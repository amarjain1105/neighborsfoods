import { Injectable } from '@angular/core';
import { ApiService } from '../api/api';
import 'rxjs/Rx';
@Injectable()
export class GroupService 
{
    constructor(private apiService: ApiService) {}
    createGroup(groupName,from)
    {
        return this.apiService.post('/createGroup.php',{action:"createGroup",groupName:groupName,email:localStorage.getItem("username"),from:from});
    }

    joinGroup(data,from)
    {
        return this.apiService.post('/groupJoin.php',{action:"groupJoin",data:data,email:localStorage.getItem("username"),from:from});
    }

    deleteGroup(groupName,from)
    {
        return this.apiService.post('/createGroup.php',{action:"createGroup",groupName:groupName,email:localStorage.getItem("username"),from:from});
    }
    
}