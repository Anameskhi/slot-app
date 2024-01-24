import { SlotCategory } from './../../core/interfaces/slotCategory.interface';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlotService } from 'src/app/core/services/slot.service';
import { SlotCategoryNavBarInfo } from './models/slot-category-info';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subject, from, map, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-slots',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss'],
})
export class SlotsComponent implements OnInit, OnDestroy {

  isExpanded = false;
  categoryNavBarInfo = SlotCategoryNavBarInfo;
  providers$ = this.slotService.getProvidersList().pipe(map(res => res.data));
  currentFilter = signal('');
  takUntilDestroy = new Subject()
  constructor(
    private slotService: SlotService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams
    .pipe(takeUntil(this.takUntilDestroy))
    .subscribe(params => {
      this.currentFilter.set(params['filter'])
    });
  }

   ngOnDestroy(): void {
    this.takUntilDestroy.next(null)
    this.takUntilDestroy.complete()
  }

  ngOnInit(): void {
    this.getSlotArray()
  
  }

getSlotArray() {
  this.slotService.getCategories()
    .pipe(
      takeUntil(this.takUntilDestroy),
      map(res => res.data),
      map(data => data.filter(item => ['web:popular', 'web:new_games', 'web:buy_bonus'].includes(item.category))),
      switchMap(filteredData => filteredData),
    )
    .subscribe(filteredSlot => {
      const matchingSlot = SlotCategoryNavBarInfo.find(slot => slot.filter === filteredSlot.category);
      if (matchingSlot) {
        matchingSlot.totalGames = filteredSlot.totalGames
      }
    });
}

}