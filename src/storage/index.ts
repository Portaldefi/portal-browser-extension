interface IItems {
  [key: string]: String | Object
}

type fieldType = String | Array<String> | Object;
const syncGet = async (fields: fieldType): Promise<IItems> => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(fields, (result: IItems) => resolve(result));
  })
}

const syncSet = async (items: IItems): Promise<Boolean> => {
  return new Promise((resolve) => {
    chrome.storage.sync.set(items, () => resolve(true));
  })
}

export { syncGet, syncSet };