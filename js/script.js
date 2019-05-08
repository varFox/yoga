window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  let tab = document.querySelectorAll('.info-header-tab'),
    info = document.querySelector('.info-header'),
    tabContent = document.querySelectorAll('.info-tabcontent');

  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }

  hideTabContent(1);

  function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  }

  info.addEventListener('click', (e) => {
    let target = e.target;
    if (target && target.classList.contains('info-header-tab')) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });
  // прокрутка (scroll)
  let goTo = document.querySelectorAll('.container ul li a');

  goTo.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      let blockID = item.getAttribute('href');
      document.querySelector('' + blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  })

  // таймер
  function zero(a) {
    if (a < 10) {
      a = '0' + a;
    }
    return a;
  }

  let deadline = '2019-10-21';

  function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
      hs = Math.floor(t / (1000 * 60 * 60)),
      ms = Math.floor((t / 1000 / 60) % 60),
      ss = Math.floor((t / 1000) % 60);
    return {
      'total': t,
      'hours': hs,
      'minutes': ms,
      'seconds': ss
    };
  }

  function setClock(id, endtime) {
    let timer = document.getElementById(id),
      hours = timer.querySelector('.hours'),
      minutes = timer.querySelector('.minutes'),
      seconds = timer.querySelector('.seconds'),
      timeIntervar = setInterval(updateClock, 1000);

    function updateClock() {
      let t = getTimeRemaining(endtime);
      hours.textContent = zero(t.hours);
      minutes.textContent = zero(t.minutes);
      seconds.textContent = zero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeIntervar);
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';
      }
    }
  }

  setClock('timer', deadline);

  // modal

  let more = document.querySelector('.more'),
    overlay = document.querySelector('.overlay'),
    close = document.querySelector('.popup-close'),
    popup = document.querySelector('.popup');


  function isMobile() {
    if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
      return true;
    }
    return false;
  }

  more.addEventListener('click', () => {
    overlay.style.display = 'block';
    if (navigator.userAgent.match(/MSIE|Edge/i)) {
      overlay.classList.add('fade');
      popup.classList.add('more-splash');
    } else if (isMobile()) {} else {
      let a = 0;
      popup.style.top = "50px";
      let timer = setInterval(() => {
        if (popup.style.top == '150px') {
          clearInterval(timer);
        } else {
          a += 2;
          popup.style.top = a + 'px';
        }
      }, 20)
    }
    document.body.style.overflow = 'hidden';
  });


  close.addEventListener('click', () => {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
    if (navigator.userAgent.match(/MSIE|Edge/i)) {
      overlay.classList.remove('fade');
      popup.classList.remove('more-splash');
    }
  });

  let description = document.querySelectorAll('.description-btn');

  description.forEach(item => {
    item.addEventListener('click', () => {
      overlay.style.display = 'block';
      if (navigator.userAgent.match(/MSIE|Edge/i)) {
        overlay.classList.add('fade');
        popup.classList.add('more-splash');
      } else if (isMobile()) {} else {
        let a = 0;
        popup.style.top = "50px";
        let timer = setInterval(function () {
          if (popup.style.top == '150px') {
            clearInterval(timer);
          } else {
            a += 2;
            popup.style.top = a + 'px';
          }
        }, 20)
      }
      document.body.style.overflow = 'hidden';
    });
  });

  // form

  let message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  let form = document.querySelector('.main-form'),
    input = form.getElementsByTagName('input'),
    statusMessage = document.createElement('div');

  statusMessage.classList.add('status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.appendChild(statusMessage);

    let reqest = new XMLHttpRequest();
    reqest.open('POST', 'server.php');
    reqest.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    let formData = new FormData(form);

    let obj = {};
    formData.forEach(function (value, key) {
      obj[key] = value;
    });
    let json = JSON.stringify(obj);

    reqest.send(json);

    reqest.addEventListener('readystatechange', () => {
      if (reqest.readyState < 4) {
        statusMessage.textContent = message.loading;
      } else if (reqest.readyState === 4 && reqest.status == 200) {
        statusMessage.textContent = message.success;
      } else {
        statusMessage.textContent = message.failures;
      }
    });

    for (let i = 0; i < input.length; i++) {
      input[i].value = '';
    }
  });

  // validNumber
  const number = document.querySelector('.popup-form__input');
  let pos = number.value.length;

  number.addEventListener('keydown', (e) => {

    e.preventDefault();
    if (e.key.match(/[0-9]/) && pos < 16 && (pos == '13' || pos == '10')) {
      number.value += ' ' + e.key;
      pos = number.value.length;
    } else if (e.key.match(/[0-9]/) && pos < 16) {
      number.value += e.key;
      pos = number.value.length;
      if (pos == '6') {
        number.value += ')';
      } else if (pos == '10' || pos == '13') {
        number.value += ' ';
      }
      pos = number.value.length;
    }

    if (e.key == 'Backspace') {
      if (pos == '12' || pos == '15' || pos == '7') {
        number.value = number.value.substring(0, pos - 2);
      } else if (pos > 3) {
        number.value = number.value.substring(0, pos - 1);
      }
      pos = number.value.length;
    }
  });

  number.addEventListener('focus', () => {
    number.value = '+7(';
  });
  number.addEventListener('blur', () => {
    number.value = '';
  });
});