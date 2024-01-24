import { SlotCategory } from './../../core/interfaces/slotCategory.interface';
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlotService } from 'src/app/core/services/slot.service';
import { SlotCategoryNavBarSVG } from './models/slot-svg';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-slots',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss'],
})
export class SlotsComponent implements OnInit {

  isExpanded = false;
  categoryNavBarInfo = SlotCategoryNavBarSVG;
  providers$ = this.slotService.getProvidersList().pipe(map(res => res.data));
  currentFilter = signal('');

  constructor(
    private slotService: SlotService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.currentFilter.set(params['filter'])
    });
  }
  ngOnInit(): void {
    this.getSlotArray()
  
  }


  getSlotArray(){
    this.slotService.getCategories().subscribe(res=>{
      const filterWithCategory = res.data.filter(res=> res.category == 'web:popular' || res.category == 'web:new_games' || res.category == 'web:buy_bonus')
      filterWithCategory.forEach(filterSlot => {
      const matchingSlot = SlotCategoryNavBarSVG.find(slot => slot.filter === filterSlot.category);
      if (matchingSlot) {
        matchingSlot.totalGAmes=filterSlot.totalGames;
      }
    });
  });

}}