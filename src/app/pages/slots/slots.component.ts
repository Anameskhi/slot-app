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
