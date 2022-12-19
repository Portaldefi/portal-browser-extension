import { syncGet, syncSet } from '../storage';

const handleActionClick = async () => {
  const accountStatus = await syncGet('accountStatus');

  if (accountStatus !== undefined) {
    chrome.tabs.create({
      url: 'onboarding.html'
    })
  }
};

export {
  handleActionClick
}