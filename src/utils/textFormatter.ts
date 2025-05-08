export const formatter = (text: string) => {
  const formattedText = text.trim().replace(/ /g, "_").toLowerCase();
  return formattedText;
};
