import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlotService } from 'src/app/core/services/slot.service';
import { SlotCategoryNavBarSVG } from './models/slot-svg';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink, RouterOutlet } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-slots',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet],
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss'],
})
export class SlotsComponent {

  initialDisplayCount = 18;
  isExpanded = false;
  categoryNavBarInfo = SlotCategoryNavBarSVG;
  providers$ = this.slotService.getProvidersList().pipe(map(res => res.data));
  visibleProvider$ = this.providers$.pipe(map(providers => providers.slice(0, this.initialDisplayCount)));

  
  constructor(
    private slotService: SlotService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
  }

  getSanitizedSvg(svgString: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svgString);
  }
}
