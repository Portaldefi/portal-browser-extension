import { handleActionClick, handleStartup } from './action';
import { createDB, insertAccount } from './database';

createDB();

chrome.action.onClicked.addListener(handleActionClick);
chrome.runtime.onMessageExternal.addListener(
  function(request:any, sender:any, sendResponse:any) {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");
    if (request.request === 'account') {
      // window.open("onboarding.html", "extension_popup", "width=300,height=400,status=no,scrollbars=yes,resizable=no");
      chrome.windows.create({ url: 'index.html#/notification', type: 'panel', width: 350, height: 460 });
      sendResponse({message: "hello world"});
    }
  }
)
chrome.runtime.onStartup.addListener(handleStartup);

export {}; // stops ts error that the file isn't a module
