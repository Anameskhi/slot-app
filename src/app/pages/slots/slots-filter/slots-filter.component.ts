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
      this.getSlotsByProvider()
    })
  }

  getSlotsByProvider(){
    if (this.activatedFilterRoute) {
      this.slotService.getSlotsByProvider(this.activatedFilterRoute).subscribe(res=>{
        this.selectedGamesArray = res.data.games
      });
      this.getSlotByCategory()
    }
  }

  getSlotByCategory() {
      this.slotService.getCategories().subscribe(res => {
        const filteredObjects = res.data.filter((slotObj: any) => {
          return slotObj.category.includes(this.activatedFilterRoute);
        });
        this.selectedGamesArray = [].concat(...filteredObjects.map((slotObj: any) => slotObj.games));
  })
}
}
