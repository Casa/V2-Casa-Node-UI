const goldSvg = '<svg viewBox="0 0 2 2"><circle cx="1" cy="1" r="1" fill="#ffea70"/></svg>';
const pinkSvg = '<svg viewBox="0 0 2 2"><circle cx="1" cy="1" r="1" fill="#f0649e"/></svg>';
const greenSvg = '<svg viewBox="0 0 2 2"><circle cx="1" cy="1" r="1" fill="#2dcccd"/></svg>';

const baseOptions = {
  duration: 15000,
  iconPack: 'callback',
  className: 'casa-toast',
  action: {
    text: '',
    onClick: (e, toast) => toast.goAway(0)
  }
};

export const defaultConfig = {
  ...baseOptions,
  icon: el => {
    el.innerHTML = goldSvg;
    return el;
  }
};

export const successConfig = {
  ...baseOptions,
  icon: el => {
    el.innerHTML = greenSvg;
    return el;
  }
};


export const errorConfig = {
  ...baseOptions,
  icon: el => {
    el.innerHTML = pinkSvg;
    return el;
  }
};