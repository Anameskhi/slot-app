import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlotService } from 'src/app/core/services/slot.service';
import { SlotCategoryNavBarSVG } from './models/slot-svg';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-slots',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss'],
})
export class SlotsComponent {
  constructor(
    private slotService: SlotService,
    private sanitizer: DomSanitizer
  ) {}

  games!: any[];
  visibleCategories: any[] = [];
  hiddenCategories: any[] = [];
  initialDisplayCount = 10;
  isExpanded = false;

  categoryNavBarInfo = SlotCategoryNavBarSVG;
  cardsInfo = [
    'Burning Hot',
    'Burning Hot',
    'Burning Hot',
    'Burning Hot',
    'Starburst',
    'Burning Hot',
    'Burning Hot',
    'Starburst',
    'Burning Hot',
    'Burning Hot',
    'Starburst',
  ];

  ngOnInit(): void {
    this.slotService.getAllCategories().subscribe((res) => {
      this.games = res.data;
      this.visibleCategories = this.games.slice(0, this.initialDisplayCount);
      this.hiddenCategories = this.games.slice(this.initialDisplayCount);
      console.log(this.hiddenCategories);
    });
    this.slotService
      .getProvidersList()
      .subscribe((res) => console.log(res.data));
  }

  getSanitizedSvg(svgString: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svgString);
  }

  toggleCategories(): void {
    this.isExpanded = !this.isExpanded;
  }
}
