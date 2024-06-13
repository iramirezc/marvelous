import type { Character } from "../../types";
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

enum ImageVariant {
  PORTRAIT_SMALL = "portrait_small",
  PORTRAIT_MEDIUM = "portrait_medium",
  PORTRAIT_XLARGE = "portrait_xlarge"
}

const parseImageUrl = (params: {
  path: string;
  variant: string;
  extension: string;
}) => new URL(`${params.path}/${params.variant}.${params.extension}`);

const transformCharacterData = (data: CharacterData): Character => ({
  id: String(data.id),
  name: String(data.name).trim(),
  description: String(data.description).trim(),
  image: parseImageUrl({
    path: data.thumbnail.path,
    variant: ImageVariant.PORTRAIT_XLARGE,
    extension: data.thumbnail.extension
  }).toString(),
  liked: false,
  comics: []
});

const fetchCharacters = async () => {
  let data: CharacterData[] = [];

  const cache = charactersCache.get<CharacterData[]>();

  if (cache) {
    data = cache;
  } else {
    data = await apiService.getCharacters<CharacterData[]>();
    charactersCache.save(data);
  }

  return data.map(transformCharacterData);
};

const fetchCharactersByName = async (name: string) => {
  const data = await apiService.getCharacters<CharacterData[]>({
    nameStartsWith: name
  });

  return data.map(transformCharacterData);
};

const charactersService = { fetchCharacters, fetchCharactersByName };

export default charactersService;
