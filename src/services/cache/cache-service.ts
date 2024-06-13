export const save = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const get = <T>(key: string) => {
  const value = localStorage.getItem(key);

  return value ? (JSON.parse(value) as T) : null;
};

export const remove = (key: string) => {
  localStorage.removeItem(key);
};

export const clear = () => {
  localStorage.clear();
};
