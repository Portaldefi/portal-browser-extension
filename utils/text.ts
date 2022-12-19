
/**
* Function that concatenates text to a prespecified length or default of 10
* @param    {any}           text as a string 
* @param    {Number}        length of 10 if no argument supplied
* @return   {String}        concatenated string
*/
export const cutter = (text:any, length = 10) => {
  if (text.length < length) {
    return text;
  } else {
    return `${text.slice(0, length - 6)}...${text.slice(-3)}`;
  }
}