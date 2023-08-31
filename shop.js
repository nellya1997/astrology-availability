const purchases = document.querySelector('.formPay__calculator__purchases');
const priceAll = document.querySelectorAll('.formPay__calculator__price');
const cartBadge = cartDiv.querySelector('.cart__badge');

const renderShop = () => {
  purchases.innerHTML = cart
    .getAll()
    .map(
      (item) => `
    <div class="row d-flex justify-content-between align-items-center mb-3">
      <span class="col-12 col-xl-6 fw-bold mb-3 mb-xl-0">${cart.getNameItem(
        item.id,
      )}</span>

      <span class="col-5 col-xl-2 fs-6">${cart.getPriceItem(item.id)} BYN</span>
      <i id=${
        item.id
      } data-manager="removeItem" class="bi bi-x-circle col-2 col-xl-1 fs-5 text-end"></i>
    </div>
  `,
    )
    .join('');
  priceAll.forEach((price) => (price.textContent = cart.getPriceAll()));
  cartBadge.textContent = cart.getCountItems();
  cartDiv.dataset.bsTitle = `= ${cart.getPriceAll()} BYN`;
  if (window.screen.width > 768) {
    new bootstrap.Tooltip(cartDiv);
  }

  const managersButtons = document.querySelectorAll('[data-manager]');
  managersButtons.forEach((button) => {
    button.addEventListener(
      'click',
      ({
        target: {
          id,
          dataset: { manager },
        },
      }) => {
        cart[manager](id);
        if (cart.getCount() === 0) {
          closeModal();
          return closeCart();
        }
        renderShop();
      },
    );
  });
};

/*
it was removed from 14th
       <span class="col-5 col-xl-3 fs-5 text-xl-center">
        <i id=${item.id} data-manager="decrementCount" class="bi bi-dash-circle me-1"></i>
        ${cart.getCountItem(item.id)}
        <i id=${item.id} data-manager="incrementCount" class="bi bi-plus-circle ms-1"></i>
      </span>
 */

const shopInit = () => {
  const buyButtons = document.querySelectorAll('.buy');

  const openShop = ({ target }) => {
    if (cart.getCount() === 0) {
      showCart();
    }
    openModal();

    /*    когда будет короткое описание карточек, лучше сделать так:
      таким образом, данные будут добавлены напрямую со страницы, что избавляет от проблемы
      дублирования данных при добавлении новых карточек товара в массив data.

    const id = target.id;
    const name = target.closest('.services__accordion').querySelector('.services__mini').lastElementChild.textContent;
    const price = parseInt(target.previousElementSibling.textContent);

    const service = { id, name, price };
*/

    const service = data.find((item) => item.id === target.id);
    cart.addItem(service);
    renderShop();
  };

  cartDiv.addEventListener('click', openModal);

  buyButtons.forEach((button) => {
    button.addEventListener('click', openShop);
  });
};

shopInit();
