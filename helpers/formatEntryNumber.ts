/**
 * Formats a number into a 4-digit string with leading zeros.
 * @param {number} number - The entry number.
 * @returns {string} The formatted string.
 */
export const formatEntryNumber = (number) => {
  return String(number).padStart(4, "0");
};
