import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SlotService } from 'src/app/core/services/slot.service';
import { map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-slots-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slots-filter.component.html',
  styleUrls: ['./slots-filter.component.scss']
})
export class SlotsFilterComponent implements OnInit {
  activatedFilterRoute?: string
  selectedGamesArray: any = []

  constructor(private activatedRoute: ActivatedRoute, private slotService: SlotService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
    .pipe(
      map(res => res['filter']),
      switchMap(activatedFilterRoute => {
        this.activatedFilterRoute = activatedFilterRoute;
        return of(this.getSlots());
      })
    )
    .subscribe();
  }

  getSlots() {
    if (this.activatedFilterRoute) {
      const filterType = this.activatedRoute.snapshot.queryParams['filterType'];
  
      if (filterType === 'provider') {
        this.slotService.getSlotsByProvider(this.activatedFilterRoute)
          .pipe(
            map(res => res.data.games),
          )
          .subscribe(selectedGames => {
            this.selectedGamesArray = selectedGames;
          });
      } else {
        this.getSlotsByCategory();
      }
    }
  }
  
  getSlotsByCategory() {
    this.slotService.getCategories()
      .pipe(
        map(res => res.data),
        map(data => data.find(slot => slot.category === this.activatedFilterRoute)),
      )
      .subscribe(matchingSlot => {
        this.selectedGamesArray = matchingSlot?.games;
      });
  }
}
