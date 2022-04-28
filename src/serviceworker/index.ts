import { handleActionClick } from './action';

chrome.action.onClicked.addListener(handleActionClick);

export {}; // stops ts error that the file isn't a module
