export const shortenString = (str: string) => {
  return str.substring(0, 6) + '...' + str.substring(str.length - 3);
};

export const dateToString = (dat: Date) => {
  return dat.getFullYear() + '-' + (dat.getMonth() + 1) + '-' + dat.getDate();
}