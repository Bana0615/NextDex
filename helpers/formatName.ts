export const formatName = (name: string, delimiter: string = "-") => {
  if (!name) return "";
  return name
    .split(delimiter)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
