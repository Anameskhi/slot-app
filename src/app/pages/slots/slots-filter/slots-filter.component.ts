import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SlotService } from 'src/app/core/services/slot.service';

@Component({
  selector: 'app-slots-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slots-filter.component.html',
  styleUrls: ['./slots-filter.component.scss']
})
export class SlotsFilterComponent implements OnInit{
  activatedFilterRoute?: string
  selectedGamesArray:any = []
 
  constructor(private activatedRoute: ActivatedRoute, private slotService: SlotService){}
  
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(res => {
      this.activatedFilterRoute = res['filter'];
      this.getSlots()
    })
  }

  getSlots(){
    if (this.activatedFilterRoute ) {
      const filterType = this.activatedRoute.snapshot.queryParams['filterType']
      if( filterType === 'provider'){
        this.slotService.getSlotsByProvider(this.activatedFilterRoute).subscribe(res=>{
          this.selectedGamesArray = res.data.games
        });
      }else{
        this.getSlotsByCategory()
      }
    }
  }

  getSlotsByCategory() {
    this.slotService.getCategories().subscribe(res => {
      const matchingSlot = res.data.find(slot => slot.category === this.activatedFilterRoute);
      this.selectedGamesArray = matchingSlot?.games;
      this.slotService.totalGames.next(matchingSlot?.totalGames)
    });
  }
}
