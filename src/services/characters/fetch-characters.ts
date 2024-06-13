import { Character } from "../../types";
import { getCharacters } from "../api/api-service";
import { getCharactersCache, saveCharactersCache } from "./characters-cache";

interface CharacterData {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const transformCharacterData = (data: CharacterData): Character => ({
  id: String(data.id),
  name: String(data.name).trim(),
  description: String(data.description).trim(),
  image: `${data.thumbnail.path}.${data.thumbnail.extension}`,
  liked: false,
  comics: []
});

export const fetchCharacters = async () => {
  let data: CharacterData[] = [];

  try {
    const cache = getCharactersCache<CharacterData[]>();

    if (cache) {
      data = cache;
    } else {
      data = await getCharacters<CharacterData>();
      saveCharactersCache(data);
    }
  } catch (error) {
    console.error(error);
  }

  return data.map(transformCharacterData);
};
