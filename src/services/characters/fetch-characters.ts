import { Character } from "../../types";
import { getCharacters } from "../api/api-service";

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
  try {
    const data = await getCharacters<CharacterData>();

    return data.map(transformCharacterData);
  } catch (error) {
    console.error(error);
  }

  return [];
};
