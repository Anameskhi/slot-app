import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SlotService extends BaseService {

  getAllUsers(pageCount:number):Observable<any>{
    return this.get<any>(`users?_page=${pageCount}`)
  }

  getAllCategories():Observable<any>{
    return this.get<any>(`/v2/slot/categories?include=games`)
  }

  getProvidersList():Observable<any>{
    return this.get<any>(`?type=slot&platform=desktop`)

  }
  getSlotsByProvider(provider: string):Observable<any>{
    return this.get<any>(`/v2/slot/providers/${{provider}}`)
  }
}