const contentContainer = document.querySelector('#content-container');
const cartCounterLabel = document.querySelector('#cart-counter-label');

let cartCounter = 0;
let cartPrice = 0;

const incrementCounter = () => {
  cartCounterLabel.innerHTML = `${++cartCounter}`;
  if (cartCounter === 1) cartCounterLabel.style.display = 'block';
};

const getMockData = (t) => +t.parentElement
    .previousElementSibling
    .innerHTML
    .replace(/^\$(\d+)\s\D+(\d+).*$/, '$1.$2');

const getPrice = (t, price) => Math.round((price + getMockData(t)) * 100) / 100;

const disableControls = (t, fn) => {
  t.disabled = true;
  contentContainer.removeEventListener('click', fn);
};

const enableControls = (t, fn) => {
  t.disabled = false;
  contentContainer.addEventListener('click', fn);
};

const btnClickHandler = (e) => {
  const target = e.target;
  const interval = 2000;
  let restoreHTML = null;

  if (target && target.matches('.item-actions__cart')) {

  incrementCounter();

  cartPrice = getPrice(target, cartPrice);
  restoreHTML = target.innerHTML;
  target.innerHTML = `Added ${cartPrice.toFixed(2)} $`;

    disableControls(target, btnClickHandler);

  setTimeout(() => {
    target.innerHTML = restoreHTML;
    enableControls(target, btnClickHandler);
    }, interval);
  }
};

contentContainer.addEventListener('click', btnClickHandler);
