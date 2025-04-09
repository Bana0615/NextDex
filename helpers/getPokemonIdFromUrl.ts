export const getPokemonIdFromUrl = (url) => {
  if (!url) return null;
  const parts = url.split("/").filter((part) => part !== "");
  return parts[parts.length - 1];
};
