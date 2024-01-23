import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, Subject } from 'rxjs';
import {SlotCategory} from '../interfaces/slotCategory.interface';
import { ProviderList } from '../interfaces/providerList.interface';
import { SlotProvider } from '../interfaces/slotProvider.interface';


@Injectable({
  providedIn: 'root'
})


export class SlotService extends BaseService {
   totalGames: Subject<number | undefined> = new Subject<number| undefined>()

  getCategories():Observable<SlotCategory>{
    return this.get<SlotCategory>(`/v2/slot/categories?include=games`)
  }

  getProvidersList():Observable<ProviderList>{
    return this.get<ProviderList>(`?type=slot&platform=desktop`)

  }
  getSlotsByProvider(provider: string):Observable<SlotProvider>{
    return this.get<SlotProvider>(`/v2/slot/providers/${provider}`)
  }


}