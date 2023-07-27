// Swiper client
const swiper = new Swiper('.swiper', {
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// подключение аккордионов в блоке услуги

document.addEventListener('DOMContentLoaded', () => {
  let accordions = document.querySelectorAll('.js-accordion');
  accordions.forEach((element) => {
    let control = element.querySelector('.js-button-accordion');
    control.addEventListener('click', function () {
      let accordion = this.closest('.js-accordion');
      accordion.classList.toggle('open');

      let button = this.querySelector('span');
      button.classList.toggle('rotate');
    });
  });
});

// аккордион в консультации

//FAQ - accorderon
let faq = document.querySelectorAll('.js-faq');
faq.forEach((element) => {
  let control1 = element.querySelector('.js-button-faq');
  control1.addEventListener('click', function () {
    this.closest('.js-faq').classList.toggle('open');
  });
});

// Навигация
const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav__menu');
// const body = document.body;
const close = document.querySelector('.close');
const navLinks = document.querySelectorAll('.nav__list-link');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  navMenu.classList.toggle('active');
  // body.classList.toggle('noscroll');
  // close.style.cssText = 'opacity: 0';
  burger.classList.remove('active');
});

function handleClick(event) {
  navMenu.classList.remove('active');
}

navLinks.forEach(link => {
  link.addEventListener('click', handleClick);
});

close.addEventListener('click', () => {
  navMenu.classList.remove('active');
})

const form = () => {
  const form = document.querySelector('.submit__form');
  const checkBox = form.querySelector('input[type=checkbox]');
  const submitButton = form.querySelector('input[type=submit]');

  const isCheck = checkBox.checked;
  submitButton.disabled = !isCheck;
  submitButton.style.opacity = isCheck ? '1' : '0.3';

  checkBox.addEventListener('input', () => {
    const isCheck = checkBox.checked;
    submitButton.disabled = !isCheck;
    submitButton.style.opacity = isCheck ? '1' : '0.3';
    if (form.classList.contains('was-validated') && !isCheck) {
      if (!checkBox.classList.contains('no-valid-check')) {
        checkBox.classList.add('no-valid-check', 'is-invalid');
        checkBox.nextElementSibling.classList.add('no-valid-rules');
      }
    } else {
      if (checkBox.classList.contains('no-valid-check')) {
        checkBox.classList.remove('no-valid-check', 'is-invalid');
        checkBox.nextElementSibling.classList.remove('no-valid-rules');
      }
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formElements = [...form.querySelectorAll('.form-control')];
    const emptyFields = formElements.filter((node) => {
      node.setAttribute('minlength', 3);
      node.setAttribute('required', '');
      form.classList.add('was-validated');
      if (node.value.length < 3) {
        return node;
      }
    });
    if (emptyFields.length !== 0) return;

    const formValues = formElements.reduce((acc, element) => {
      const { id, value } = element;
      acc[id] = value;
      return acc;
    }, {});

    try {
      await axios.post(routes.sendEmail, formValues);
      form.reset();
      form.classList.remove('was-validated');
      modalBackground.firstElementChild.style.overflow = 'hidden';
      modalWindow.firstElementChild.style.display = 'none';
      modalWindow.lastElementChild.style.display = '';
      modalWindow.lastElementChild.innerHTML = '<h3>Форма успешно отправлена!</h3>';
      submitButton.disabled = true;
      submitButton.style.opacity = '0.3';
      openModal();
    } catch (e) {
      const isAlertErrorEnabled = form.querySelector('div[role=alert]');
      if (!isAlertErrorEnabled) {
        const alertError = document.createElement('div');
        alertError.classList.add('alert', 'alert-danger', 'mt-3');
        alertError.setAttribute('role', 'alert');
        alertError.textContent = 'Произошла ошибка при отправке формы';
        checkBox.parentElement.append(alertError);
      }
    }
  });
};

const formPay = () => {
  const formPay = document.getElementById('formPay');
  const checkBoxPay = formPay.querySelector('#acceptPay');
  const submitButtonPay = formPay.querySelector('input[type=submit]');

  const isCheckPay = checkBoxPay.checked;
  submitButtonPay.disabled = !isCheckPay;
  submitButtonPay.style.opacity = isCheckPay ? '1' : '0.3';

  checkBoxPay.addEventListener('input', () => {
    const isCheckPay = checkBoxPay.checked;
    submitButtonPay.disabled = !isCheckPay;
    submitButtonPay.style.opacity = isCheckPay ? '1' : '0.3';
    if (formPay.classList.contains('was-validated') && !isCheckPay) {
      if (!checkBoxPay.classList.contains('no-valid-check')) {
        checkBoxPay.classList.add('no-valid-check', 'is-invalid');
        checkBoxPay.nextElementSibling.classList.add('no-valid-rules');
      }
    } else {
      if (checkBoxPay.classList.contains('no-valid-check')) {
        checkBoxPay.classList.remove('no-valid-check', 'is-invalid');
        checkBoxPay.nextElementSibling.classList.remove('no-valid-rules');
      }
    }
  });

  formPay.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payMetod = {
      id: 'pay',
      value: formPay.querySelector('input[type=radio]:checked').value,
    };
    const messengers = {
      id: 'messengers',
      value: [...formPay.querySelectorAll('.messenger:checked')].map((messenger) => messenger.id),
    };
    const grandTotal = {
      id: 'grandTotal',
      value: cart.getPriceAll(),
    };
    const services = {
      id: 'services',
      value: cart.getAll(),
    };
    const formElements = [...formPay.querySelectorAll('.form-control')];
    const emptyFields = formElements.filter((node) => {
      if (node.id === 'socialUrl') return;
      node.setAttribute('minlength', 3);
      node.setAttribute('required', '');
      formPay.classList.add('was-validated');
      if (node.id === 'phone') {
        node.setAttribute('minlength', 11);
      }
      if (node.value.length < 3) {
        return node;
      }
    });
    if (emptyFields.length !== 0) return;

    formElements.push(payMetod, services, messengers, grandTotal);
    const formValues = formElements.reduce((acc, element) => {
      const { id, value } = element;
      acc[id] = value;
      return acc;
    }, {});

    try {
      await axios.post(routes.sendEmailPay, formValues);
      await axios.post(routes.sendEmailPayClient, formValues);
      formPay.reset();
      formPay.classList.remove('was-validated');
      modalBackground.firstElementChild.style.overflow = 'hidden';
      modalWindow.firstElementChild.style.display = 'none';
      modalWindow.lastElementChild.style.display = '';
      modalWindow.lastElementChild.innerHTML = '<h3>Заказ успешно отправлен!</h3>';
      submitButtonPay.disabled = true;
      submitButtonPay.style.opacity = '0.3';
      closeCart();
      cart.clearPurchase();
    } catch (e) {
      const isAlertErrorEnabled = formPay.querySelector('div[role=alert]');
      if (!isAlertErrorEnabled) {
        const alertError = document.createElement('div');
        alertError.classList.add('alert', 'alert-danger', 'mt-3');
        alertError.setAttribute('role', 'alert');
        alertError.textContent = 'Произошла ошибка при отправке формы';
        formPay.querySelector('#pay2').parentElement.append(alertError);
      }
    }
  });
};

form();
formPay();

//перетаскивание DOM-узлов по странице будет описано ниже:

//section first
const firstResize = () => {
  //i will move these elements;
  const link = document.querySelector('.first__wrapper-link');
  const advantages = document.querySelector('.first__advantages-wrapper');
  //'containers' for moving
  const leftSide = document.querySelector('.container-none-desktop');
  const rightSideUp = document.querySelector('.first__wrapper');
  const rightSideDown = document.querySelector('.first__advantages-moving');

  function resize() {
    if (window.screen.width > 1023) {
      //take link and advantages to the left
      leftSide.appendChild(advantages);
      leftSide.appendChild(link);
    } else if (window.screen.width < 1023) {
      //take link and advantages to the right
      rightSideUp.appendChild(link);
      document
        .querySelector('.first__advantages-moving')
        .appendChild(advantages);
    }
  }

  resize();

  window.addEventListener('resize', resize);
};

firstResize();

//section about
const aboutResize = () => {
  const img = document.querySelector('.js-about-pic');
  const badge = document.querySelector('.about__lead');
  const aboutInfo = document.querySelector('.about__info');
  const aboutInfo2 = document.querySelector('.about__info-wrapper');


  const rightSide = document.querySelector('.about__wrapper-right');
  const leftSide = document.querySelector('.about__wrapperNew');

  function resize() {
    if (window.screen.width > 1450) {
      rightSide.appendChild(img);
      rightSide.appendChild(badge);
      leftSide.appendChild(aboutInfo);
    } else if (window.screen.width < 1450) {
      aboutInfo2.appendChild(aboutInfo);
      rightSide.appendChild(img);
      rightSide.appendChild(badge);
    }
  }

  resize();

  window.addEventListener('resize', resize);
};

aboutResize();

//  section feedback
const feedbackResize = () => {
  const feedback = document.querySelector('.feedback');
  const wrapper = document.querySelector('.feedback-wrapper');
  const text = document.querySelector('.feedback-wrapper__down');
  const title = document.querySelector('.feedback-wrapper__title');


  function resize() {
    if (window.screen.width < 1024) {
      feedback.prepend(title);
    } else if (window.screen.width > 1024) {
      wrapper.prepend(title);
    } else if (window.screen.width < 600) {
      feedback.appendChild(text);
    } else if (window.screen.width > 600) {
      wrapper.appendChild(text);
    }
  }

  resize();

  window.addEventListener('resize', resize);
};

feedbackResize();
