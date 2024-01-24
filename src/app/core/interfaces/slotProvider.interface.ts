export interface SlotProvider {
    data: SlotData;
  }

  export interface Game {
    name: string;
    provider: string;
    providerName: string;
    image: string;
    image2: string;
    gameId: string;
  }
  
  export interface SlotData {
    provider: string;
    name: string;
    order: number;
    games: Game[];
    totalGames: number;
  }
  