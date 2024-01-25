import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, Subject, map, switchMap, tap } from 'rxjs';
import { Game, ProviderList, SlotArray, SlotCategory, SlotProvider } from '../interfaces/modal.interface';
import { SlotCategoryNavBarInfo } from 'src/app/pages/slots/models/slot-category-info';


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

  getTotalGames(): Observable<SlotArray[]>{
   return this.getCategories().pipe(
        map(res => res.data.filter(item => ['web:popular', 'web:new_games', 'web:buy_bonus'].includes(item.category))),
        tap(filteredSlot => {
          filteredSlot.forEach(slotItem => {
            const matchingSlot = SlotCategoryNavBarInfo.find(slot => slot.filter === slotItem.category);
            if(matchingSlot){
              matchingSlot.totalGames = slotItem.totalGames
            }
          });
        }),
      )
}

getProviderList(): Observable<any>{
  return this.getProvidersList().pipe(map(res => res.data))
}
}