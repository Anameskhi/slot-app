
  
  export interface SlotCategory {
    data: SlotArray[];
  }
  
  
  export interface SlotArray {
    type: string;
    category: string;
    platform: string;
    name: string;
    order: number;
    games: Game[];
    totalGames: number;
  }
  
  export interface Game {
    name: string;
    provider: string;
    providerName: string;
    image: string;
    image2: string;
    gameId: string;
  }