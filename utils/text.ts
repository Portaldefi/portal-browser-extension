export const cutter = (text, length = 10) => {
  if (text.length < length) {
    return text;
  } else {
    return `${text.slice(0, length - 6)}...${text.slice(-3)}`;
  }
}