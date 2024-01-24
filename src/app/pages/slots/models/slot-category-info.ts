import { signal } from "@angular/core";

export const SlotCategoryNavBarInfo = [
  {
    svg: `top-slots.svg`,
    name: 'Top Slots',
    filter: 'web:popular',
    totalGames: 0
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
    totalGames: 0

  },
  {
    svg: `buy-bonus.svg`,
    name: 'Buy Bonus',
    filter: 'web:buy_bonus',
    totalGames: 0

  },
  {
    svg: `history.svg`,
    name: 'History',
    filter: 'history'
  },
];
