import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlotService } from 'src/app/core/services/slot.service';
import { SlotCategoryNavBarInfo } from './models/slot-category-info';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subject, from, map, switchMap, takeUntil, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-slots',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss'],
})
export class SlotsComponent  {

  isExpanded = false;
  categoryNavBarInfo = SlotCategoryNavBarInfo;
  providers = toSignal(this.slotService.getProviderList())
  getTotalGames = toSignal(this.slotService.getTotalGames())
  currentFilter = signal('');
  constructor(
    private slotService: SlotService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams
    .subscribe(params => {
      this.currentFilter.set(params['filter'])
    });
  }

  // getTotalGames() {
  //   this.slotService.getCategories().pipe(
  //     map(res => res.data.filter(item => ['web:popular', 'web:new_games', 'web:buy_bonus'].includes(item.category))),
  //     tap(filteredSlot => {
  //       filteredSlot.forEach(slotItem => {
  //         const matchingSlot = SlotCategoryNavBarInfo.find(slot => slot.filter === slotItem.category);
  //         if(matchingSlot){
  //           matchingSlot.totalGames = slotItem.totalGames
  //         }
  //       });
  //     })
  //   ).subscribe();
  // }

}