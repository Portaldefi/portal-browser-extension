import { insertAccount, getAccount } from './database';
import { CREATE_ACCOUNT, RETRIEVE_ACCOUNT, RuntimeMessage } from '@/config/messages';
import { IAccount } from './database/schema';

type MessageResponse = (response?: any) => void;

export default (message: RuntimeMessage, _sender: chrome.runtime.MessageSender, _sendResponse: MessageResponse) => {
  switch(message.msg) {
    case CREATE_ACCOUNT:
      insertAccount(message.payload as IAccount);
    case RETRIEVE_ACCOUNT:
      sendResponse(getAccount());
  }
}
