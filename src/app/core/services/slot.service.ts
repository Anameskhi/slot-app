import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, Subject, map } from 'rxjs';
import { Game, ProviderList, SlotCategory, SlotProvider } from '../interfaces/modal.interface';


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

  getGames(filterType: string, filter: string): Observable<Game[]>{
    if (filterType === 'provider'){
      return this.getSlotsByProvider(filter).
      pipe(
        map((provider)=> provider.data.games)
      );
    }else {
      return this.getCategories().pipe(map(category=> category.data.filter(item=> item.category === filter)[0]?.games ?? []));
    }
  }
}