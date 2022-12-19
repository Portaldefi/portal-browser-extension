export const cutter = (text:any, length = 10) => {
  if (text.length < length) {
    return text;
  } else {
    return `${text.slice(0, length - 6)}...${text.slice(-3)}`;
  }
}