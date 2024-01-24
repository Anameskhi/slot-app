import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  navBarList = [
    {
      route: '/sport',
      icon: 'sport-logo.svg',
      title: 'SPORT',
    },
    {
      route: '/live',
      icon: 'live-logo.svg',
      title: 'LIVE',
    },
    {
      route: '/slots',
      icon: 'slots-logo.svg',
      title: 'SLOTS',
    },
    {
      route: '/casino',
      icon: 'casino-logo.svg',
      title: 'CASINO',
    },
  ];
}
