import { insertAccount, getAccount, checkPassword } from './database';
import { CREATE_ACCOUNT, RETRIEVE_ACCOUNT, RuntimeMessage, CHECK_PASSWORD } from '@/config/messages';
import { IAccount } from './database/schema';

type MessageResponse = (response?: any) => void;

export default (message: RuntimeMessage, _sender: chrome.runtime.MessageSender, _sendResponse: MessageResponse) => {
  switch(message.msg) {
    case CREATE_ACCOUNT:
      insertAccount(message.payload as IAccount);
      break;
    case RETRIEVE_ACCOUNT:
      getAccount().then(result => {
        chrome.storage.local.set({ account: result });
        _sendResponse(result)
      });
      break;
    /*case CHECK_PASSWORD:
      // @ts-ignore
      checkPassword(0, message.payload as string).then(res => {
        console.log('msg ' + res);
        chrome.storage.local.set({ passwordCheck: res });
        _sendResponse(res);
      });
      break;*/
  }
}
