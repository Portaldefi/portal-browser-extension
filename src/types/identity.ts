export type IHistory = string;

export type IAddress = string | undefined;

export interface IChain {
  address: IAddress,
  history: IHistory,
  connectedWebsites: Array<string>
};

export interface IIdentity {
  [index: number]: IChain
};
