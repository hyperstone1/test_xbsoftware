export const setLocalStorage = (key, data) => {
  localStorage.setItem(key, data);
};

export const getLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export const clearLocalStorageByKey = (key) => {
  localStorage.removeItem(key);
};
