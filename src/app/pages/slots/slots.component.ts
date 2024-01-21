import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlotService } from 'src/app/core/services/slot.service';

@Component({
  selector: 'app-slots',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss']
})
export class SlotsComponent {
  constructor(private slotService: SlotService) {}

  games!: any[];
  visibleCategories: any[] = [];
  hiddenCategories: any[] = [];
  initialDisplayCount = 8;
  isExpanded = false;

  ngOnInit(): void {
    this.slotService.getAllCategories().subscribe(res => {
      this.games = res.data;
      this.visibleCategories = this.games.slice(0, this.initialDisplayCount);
      this.hiddenCategories = this.games.slice(this.initialDisplayCount);
      console.log(this.hiddenCategories);
    });
    this.slotService.getProvidersList().subscribe(res=>console.log(res.data))
  }

  toggleCategories(): void {
    this.isExpanded = !this.isExpanded;
  }
}
