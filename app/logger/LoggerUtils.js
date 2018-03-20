// If there are more than one sibling element
// we need to know, which one is targeted
const getSiblingIndex = e => {
  let sibCount = 0;
  let sibIndex = 0;
  for (let i = 0; i < e.parentNode.childNodes.length; i += 1) {
      const sib = e.parentNode.childNodes[i];
      if (sib.nodeName === e.nodeName) {
          if (sib === e) {
              sibIndex = sibCount;
          }
          sibCount += 1;
      }
  }
  return sibCount > 1 ? sibIndex : null;
};

// Get XPATH with ID, classes and sibling id
const getDomPath = e => {
  const stack = [];
  while (e.parentNode) {
      // Join element classes with . before
      // .col-xs-6.col-sm-6.col-md-3
      const classes = e.classList.value
          .split(' ')
          .filter(str => str !== '')
          .map(str => `.${str}`)
          .join('');

      const sibIndex = getSiblingIndex(e);

      if (e.hasAttribute('id') && e.id !== '') {
          stack.unshift(`${e.nodeName.toLowerCase()}#${e.id}${classes}`);
      } else if (sibIndex) {
          stack.unshift(`${e.nodeName.toLowerCase()}[${sibIndex}]${classes}`);
      } else {
          stack.unshift(`${e.nodeName.toLowerCase()}${classes}`);
      }

      e = e.parentNode;
  }

  return stack.slice(1).join(' '); // removes the html element
};

const getMousePos = e => {
  let cx = 0;
  let cy = 0;
  if (e.pageX || e.pageY) {
      cx = e.pageX;
      cy = e.pageY;
  } else if (e.clientX || e.clientY) {
      cx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      cy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  // Sometimes the mouse coordinates are negative (e.g., in Opera)
  if (!cx || cx < 0) cx = 0;
  if (!cy || cy < 0) cy = 0;

  return { x: cx, y: cy };
};

export { getDomPath, getMousePos };
