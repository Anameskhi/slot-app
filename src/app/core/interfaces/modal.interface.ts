export interface ProviderList {
    data: [
        {
        gamesCount: number;
        logo: string;
        name: string;
        provider: string;
        type: string;
      }
    ]
  }


  
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
  