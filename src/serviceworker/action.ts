import { syncGet } from '../storage';
import { getAccountValid } from './database';

export const handleActionClick = async () => {
  chrome.tabs.create({
    url: 'onboarding.html'
  })
};

export const handleStartup = async () => {
  const accountStatus = await syncGet('accountStatus');
  const accValid = await getAccountValid();

  if (accValid === true)
    chrome.action.setPopup({ popup: 'index.html?popup=true' });

  if (typeof accountStatus == 'string' && accountStatus == 'set') {
    chrome.action.setPopup({ popup: 'index.html?popup=true' });
  }
}
