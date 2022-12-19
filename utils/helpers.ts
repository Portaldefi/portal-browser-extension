export const shortenString = (str: string) => {
  if(str.length > 9)
    return str.substring(0, 6) + '...' + str.substring(str.length - 3);
  else
    return str;
};

export const dateToString = (dat: Date) => {
  return dat.getFullYear() + '-' + (dat.getMonth() + 1) + '-' + dat.getDate();
}