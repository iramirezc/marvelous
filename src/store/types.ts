type Comic = {
  id: string;
  title: string;
  image: string;
  year: string;
};

export type Character = {
  id: string;
  name: string;
  image: string;
  liked: boolean;
  comics: Comic[];
};

export type AppState = {
  loading: boolean;
  characters: {
    list: Character[];
  };
  filters: {
    searchCriteria: string;
    onlyFavorites: boolean;
  };
};

export type Action = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
};
