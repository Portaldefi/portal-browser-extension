interface IPortal {
  request: Function
}

const portal: IPortal = {
  request: () => {
    chrome.runtime.sendMessage('geefmnphpoahkmkjjcifjlpakngipcii', { request: 'account' }, (response) => {
      console.log(response);
    })
  }
};
// @ts-ignore
window.portal = portal;

export default portal;