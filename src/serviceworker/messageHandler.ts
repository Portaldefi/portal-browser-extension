import { insertAccount } from './database';
import { CREATE_ACCOUNT, RuntimeMessage } from '@/config/messages';
import { IAccount } from './database/schema';

type MessageResponse = (response?: any) => void;

export default (message: RuntimeMessage, sender: chrome.runtime.MessageSender, sendResponse: MessageResponse) => {
  switch(message.msg) {
    case CREATE_ACCOUNT:
      insertAccount(message.payload as IAccount);
  }
}