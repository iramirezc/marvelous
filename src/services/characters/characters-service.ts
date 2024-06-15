import type { Character, Comic } from "../../types";
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
  NONE = "",
  PORTRAIT_SMALL = "/portrait_small",
  PORTRAIT_MEDIUM = "/portrait_medium",
  PORTRAIT_XLARGE = "/portrait_xlarge",
  PORTRAIT_FANTASTIC = "/portrait_fantastic",
  PORTRAIT_UNCANNY = "/portrait_uncanny",
  PORTRAIT_INCREDIBLE = "/portrait_incredible"
}

const parseImageUrl = (params: {
  path: string;
  variant: string;
  extension: string;
}) => new URL(`${params.path}${params.variant}.${params.extension}`);

const transformCharacterData = (data: CharacterData): Character => ({
  id: String(data.id),
  name: String(data.name).trim(),
  description: String(data.description).trim(),
  thumbnail: parseImageUrl({
    path: data.thumbnail.path,
    variant: ImageVariant.PORTRAIT_XLARGE,
    extension: data.thumbnail.extension
  }).toString(),
  picture: parseImageUrl({
    path: data.thumbnail.path,
    variant: ImageVariant.PORTRAIT_UNCANNY,
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

interface ComicData {
  id: number;
  title: string;
  dates: Array<{ type: string; date: string }>;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const getComicYear = (dates: ComicData["dates"]) => {
  const onSaleDate = dates.find((date) => date.type === "onsaleDate");

  if (!onSaleDate) {
    return "";
  }

  const date = new Date(onSaleDate.date);

  if (isNaN(date.getFullYear())) {
    return "";
  }

  return String(date.getFullYear());
};

const transformComicData = (data: ComicData): Comic => ({
  id: String(data.id),
  title: String(data.title).trim(),
  cover: parseImageUrl({
    path: data.thumbnail.path,
    variant: ImageVariant.PORTRAIT_XLARGE,
    extension: data.thumbnail.extension
  }).toString(),
  year: getComicYear(data.dates)
});

const fetchComicsByCharacterId = async (characterId: string) => {
  const data = await apiService.getComicsByCharacterId<ComicData[]>({
    characterId
  });

  return data.map(transformComicData);
};

const charactersService = {
  fetchCharacters,
  fetchCharactersByName,
  fetchComicsByCharacterId
};

export default charactersService;
