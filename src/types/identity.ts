export type IHistory = string;

export type IAddress = string | undefined;

export interface IChain {
  address: any,
  history: IHistory,
  connectedWebsites: Array<string>
};

// export interface IIdentity {
//   [index: number]: IChain
// };

export type IIdentity = Array<IChain>;
