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
  description: string;
  liked: boolean;
  comics: Comic[];
};

export type Favorites = {
  ids: string[];
  entities: Record<string, Character>;
};
