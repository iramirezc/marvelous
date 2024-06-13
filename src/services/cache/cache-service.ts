const save = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const get = <T>(key: string) => {
  const value = localStorage.getItem(key);

  return value ? (JSON.parse(value) as T) : null;
};

const remove = (key: string) => {
  localStorage.removeItem(key);
};

const clear = () => {
  localStorage.clear();
};

const cacheService = {
  save,
  get,
  remove,
  clear
};

export default cacheService;
