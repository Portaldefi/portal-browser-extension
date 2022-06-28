import { syncGet, syncSet } from '../storage';
import { createDB, insertAccount } from './database';

export const handleActionClick = async () => {
  chrome.tabs.create({
    url: 'onboarding.html'
  })
};

export const handleStartup = async () => {
  const accountStatus = await syncGet('accountStatus');

  if (accountStatus !== undefined) {
    chrome.action.setPopup({ popup: 'index.html?popup=true' });
  }
}
