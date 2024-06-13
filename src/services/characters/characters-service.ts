import { Character } from "../../types";
import apiService from "../api/api-service";
import charactersCache from "./characters-cache";

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

const fetchCharacters = async () => {
  let data: CharacterData[] = [];

  try {
    const cache = charactersCache.get<CharacterData[]>();

    if (cache) {
      data = cache;
    } else {
      data = await apiService.getCharacters<CharacterData[]>();

      charactersCache.save(data);
    }
  } catch (error) {
    throw error;
  }

  return data.map(transformCharacterData);
};

const charactersService = { fetchCharacters };

export default charactersService;
