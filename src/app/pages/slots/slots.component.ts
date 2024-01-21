import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlotService } from 'src/app/core/services/slot.service';
import { SlotCategoryNavBarSVG } from './models/slot-svg';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-slots',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet],
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss'],
})
export class SlotsComponent {
  constructor(
    private slotService: SlotService,
    private sanitizer: DomSanitizer
  ) {}

  providers!: any[];
  visibleProvider: any[] = [];
  initialDisplayCount = 18;
  isExpanded = false;

  categoryNavBarInfo = SlotCategoryNavBarSVG;
  

  ngOnInit(): void {
    this.getProviderList()
  }

  getSanitizedSvg(svgString: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svgString);
  }

  getProviderList(){
    this.slotService.getProvidersList().subscribe((res) => {
      this.providers = res.data;
      this.visibleProvider = this.providers.slice(0, this.initialDisplayCount);
    });
  }

  
}
