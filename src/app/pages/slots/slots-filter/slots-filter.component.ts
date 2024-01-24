import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SlotService } from 'src/app/core/services/slot.service';
import { Subject, map, of, switchMap, takeUntil } from 'rxjs';
import { Game } from 'src/app/core/interfaces/slotCategory.interface';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-slots-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slots-filter.component.html',
  styleUrls: ['./slots-filter.component.scss']
})
export class SlotsFilterComponent implements OnInit, OnDestroy {
  activatedFilterRoute = signal('')
  selectedGamesArray = signal<Game[]>([])
  takUntilDestroy = new Subject()

  constructor(private activatedRoute: ActivatedRoute, private slotService: SlotService) {
  }
  ngOnDestroy(): void {
    this.takUntilDestroy.next(null)
    this.takUntilDestroy.complete()
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
    .pipe(
      takeUntil(this.takUntilDestroy),
      map(res => res['filter']),
      switchMap(activatedFilterRoute => {
        this.activatedFilterRoute.set(activatedFilterRoute);
        return of(this.getSlots());
      })
    )
    .subscribe();
  }

  getSlots() {
    if (this.activatedFilterRoute) {
      const filterType = this.activatedRoute.snapshot.queryParams['filterType'];
  
      if (filterType === 'provider') {
        this.slotService.getSlotsByProvider(this.activatedFilterRoute())
          .pipe(
            takeUntil(this.takUntilDestroy),
            map(res => res.data.games),
          )
          .subscribe(selectedGames => {
            this.selectedGamesArray.set(selectedGames);
          });
      } else {
        this.getSlotsByCategory();
      }
    }
  }

  getSlotsByCategory() {
    this.slotService.getCategories()
      .pipe(
        takeUntil(this.takUntilDestroy),
        map(res => res.data),
        map(data => data.find(slot => slot.category === this.activatedFilterRoute())),
      )
      .subscribe(matchingSlot => {
        this.selectedGamesArray.set(matchingSlot!.games)
      });
  }
}
