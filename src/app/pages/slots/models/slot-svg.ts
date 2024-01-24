import { signal } from "@angular/core";

export const SlotCategoryNavBarSVG = [
  {
    svg: `top-slots.svg`,
    name: 'Top Slots',
    filter: 'web:popular',
    totalGAmes: 0
  },
  {
    svg: `favourites.svg`,
    name: 'Favorites',
    filter: 'favourites',
  },
  {
    svg: `new-games.svg`,
    name: 'New Games',
    filter: 'web:new_games',
    totalGAmes: 0

  },
  {
    svg: `buy-bonus.svg`,
    name: 'Buy Bonus',
    filter: 'web:buy_bonus',
    totalGAmes: 0

  },
  {
    svg: `history.svg`,
    name: 'History',
    filter: 'history'
  },
];
