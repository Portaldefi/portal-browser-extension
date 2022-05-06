import { handleActionClick } from './action';

chrome.action.onClicked.addListener(handleActionClick);
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");
    if (request.request === 'account') {
      // window.open("onboarding.html", "extension_popup", "width=300,height=400,status=no,scrollbars=yes,resizable=no");
      chrome.windows.create({ url: 'index.html#/connection-detail', type: 'panel', width: 350, height: 460 });
      sendResponse({message: "hello world"});
    }
  }
)

export {}; // stops ts error that the file isn't a module
