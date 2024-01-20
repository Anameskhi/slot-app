import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SlotService } from './core/services/slot.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[HttpClientModule,HttpClient,BrowserModule,SlotService],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  title = 'croco-project';
  constructor( private slotService: SlotService){}
  games!:any[]
  ngOnInit(): void {
    this.slotService.getAllCategories().subscribe(res=>{
      this.games = res.data
      console.log(res.data)
    })

    this.slotService.getProvidersList().subscribe(res=>console.log(res.data))
    this.slotService.getSlotsByProvider().subscribe(res=>console.log(res.data))

  }

}
