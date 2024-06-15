export type Comic = {
  id: string;
  title: string;
  cover: string;
  year: string;
};

export type Character = {
  id: string;
  name: string;
  thumbnail: string;
  picture: string;
  description: string;
  liked: boolean;
  comics: Comic[];
};

export type Favorites = {
  ids: string[];
  entities: Record<string, Character>;
};
