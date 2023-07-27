const modalBackground = document.querySelector('.modalBackground');
const modalClose = document.querySelector('.modalClose');
const modalWindow = document.querySelector('.modalWindow');
const scrollBar = window.innerWidth - document.body.clientWidth;

const closeModal = () => {
  modalBackground.style.display = 'none';
  modalBackground.parentElement.style.overflow = '';
  modalBackground.parentElement.style.marginRight = '';
  document.querySelector('.cart').style.marginRight = '';
};

[modalClose, modalBackground].forEach((modal) => {
  modal.addEventListener('click', ({  target }) => {
    if (target === modalBackground || target === modalClose) {
      closeModal();
        if (cart.getCount() === 0) {
          closeCart();
        }
        if (modalWindow.firstElementChild.style.display === 'none') {
          modalBackground.firstElementChild.style.overflow = '';
          modalWindow.firstElementChild.style.display = '';
          modalWindow.lastElementChild.style.display = 'none';
        }
    }
  });
});

const openModal = () => {
  modalBackground.style.display = 'block';
  modalBackground.parentElement.style.overflow = 'hidden';
  
  if (window.screen.width > 768) {
    modalBackground.parentElement.style.marginRight = `${scrollBar}px`;
    document.querySelector('.cart').style.marginRight = `${scrollBar - 1}px`;
  }
};
