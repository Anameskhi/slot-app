import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SlotService } from 'src/app/core/services/slot.service';
import { switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-slots-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slots-filter.component.html',
  styleUrls: ['./slots-filter.component.scss']
})
export class SlotsFilterComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly slotService = inject(SlotService);

  games = toSignal(
    this.activatedRoute.queryParams.pipe(
    switchMap(({filterType, filter}) => this.slotService.getGames(filterType, filter))), {initialValue: []});
}