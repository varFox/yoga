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
    mainForm.style.display = '';
    statusMessage.innerHTML = '';
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
    loadingImg: 'img/ajax-loader.gif',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    successImg: 'img/smartphone.png',
    failure: 'Что-то пошло не так...'
  };

  let mainForm = document.querySelector('.main-form'),
    form = document.querySelector('#form'),
    input = form.getElementsByTagName('input'),
    popapForm = document.querySelector('.popup-form'),
    contactForm = document.querySelector('.contact-form'),
    
    statusMessage = document.createElement('div'),
    statusFormImg = document.createElement('img'),
    statusFormP = document.createElement('p');

  statusFormImg.style.cssText = 'height: 100px; margin: 10px auto; display: block;';
  statusMessage.style.cssText = 'width: 100%; text-align: center; color: white';

  function sendForm(elem, popap) {
    elem.addEventListener('submit', (e) => {
      e.preventDefault();
      popap.appendChild(statusMessage);
      statusMessage.appendChild(statusFormImg);
      statusMessage.appendChild(statusFormP);
      let formData = new FormData(elem);


      function postData(data) {
        return new Promise(function (resolve, reject) {
          let request = new XMLHttpRequest();
          request.open('POST', 'server.php');
          request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

          request.onreadystatechange = function () {
            elem.style.display = 'none';
            if (request.readyState < 4) {
              resolve();
            } else if (request.readyState === 4) {
              if (request.status == 200) {
                resolve();
              } else {
                reject();
              }

            }
          }
          let jsonObject = {};

          for (const [key, value] of data.entries()) {
            jsonObject[key] = value;
            
          }
          request.send(JSON.stringify(jsonObject));
        });
      }

      function clearInput() {
        for (let i = 0; i < input.length; i++) {
          input[i].value = '';
        }
        pos = 0;
      }
      postData(formData)
        .then(() => {
          statusFormImg.src = message.loadingImg;
          statusFormP.textContent = message.loading;
        })
        .then(() => {
          statusFormImg.src = message.successImg;
          statusFormP.textContent = message.success;
        })
        .catch(() => statusFormP.textContent = message.failures)
        .then(clearInput);


    });
  }

  sendForm(form, contactForm);
  sendForm(mainForm, popapForm);

  // validNumber
  const number = document.querySelector('.popup-form__input'),
        telNumber = document.querySelectorAll('#form input')[1];
  let pos = number.value.length,
      telPos = telNumber.value.length;

  number.addEventListener('keydown', (e) => {
    validNumber(e, number, pos);
  });
 
  telNumber.addEventListener('keydown', (e) => {
    validNumber(e, telNumber, telPos);
  });

  function validNumber(e, input, pos) {
    pos = input.value.length;
    e.preventDefault();
    if (e.key.match(/[0-9]/) && pos < 16 && (pos == '13' || pos == '10')) {
      input.value += ' ' + e.key;
      pos = input.value.length;
    } else if (e.key.match(/[0-9]/) && pos < 16) {
      input.value += e.key;
      pos = input.value.length;
      if (pos == '6') {
        input.value += ')';
      } else if (pos == '10' || pos == '13') {
        input.value += ' ';
      }
      pos = input.value.length;
    }

    if (e.key == 'Backspace') {
      if (pos == '12' || pos == '15' || pos == '7') {
        input.value = input.value.substring(0, pos - 2);
      } else if (pos > 3) {
        input.value = input.value.substring(0, pos - 1);
      }
      pos = input.value.length;
    }
    return pos;
  }
  number.addEventListener('focus', () => {
    if (pos == 0) {
      number.value = '+7(';
      pos = 3;
    }
  });
  number.addEventListener('blur', () => {
    if (number.value.slice(-1) == '(') {
      number.value = '';
      pos = 0;
    }
  });
  telNumber.addEventListener('focus', () => {
    if (telPos == 0) {
      telNumber.value = '+7(';
      telPos = 3;
    }
  });
  telNumber.addEventListener('blur', () => {
    if (telNumber.value.slice(-1) == '(') {
      telNumber.value = '';
      telPos = 0;
    }
  });

  // slider 

  let slideIndex = 1,
    slides = document.querySelectorAll('.slider-item'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    dotsWrap = document.querySelector('.slider-dots'),
    dots = document.querySelectorAll('.dot');

  function showSlides(n) {
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    dots.forEach((item) => item.classList.remove('dot-active'));
    slides.forEach((item) => {
      item.style.display = 'none'
      item.classList.remove('my-fade');
      item.classList.remove('out-my-fade');
    });

    dots[slideIndex - 1].classList.add('dot-active');
    slides[slideIndex - 1].classList.add('my-fade');
    slides[slideIndex - 1].style.display = '';
    
  }
  showSlides(slideIndex);


  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  prev.addEventListener('click', () => {
    plusSlides(-1);
  });
  next.addEventListener('click', () => {
    plusSlides(1);
  });

  dotsWrap.addEventListener('click', (e) => {
    for (let i = 0; i < dots.length + 1; i++) {
      if (e.target.classList.contains('dot') && e.target == dots[i - 1]) {
        currentSlide(i);
      }
    }
  });

  // calc

  let persons = document.querySelectorAll('.counter-block-input')[0],
    restDays = document.querySelectorAll('.counter-block-input')[1],
    place = document.getElementById('select'),
    totalValue = document.getElementById('total'),
    personsSum = 0,
    daysSum = 0,
    total = 0;
  totalValue.innerHTML = '0';

  place.addEventListener('change', function () {
    if (persons.value == '' || restDays.value == '' || persons.value == '0' || restDays.value == '0') {
      totalValue.innerHTML = 0;
    } else {
      let a = total * place.value - 500;
      if (a < 0) a = 0;
      let printNum = setInterval(() => {
        if (a < total * place.value) {
          a += 5;
          totalValue.innerHTML = a;
        } else {
          clearInterval(printNum);
        }
      }, 5)      
    }
  });

  persons.addEventListener('keydown', function (e) {
    inputCalc(this, e)
  });
  restDays.addEventListener('keydown', function (e) {
    inputCalc(this, e)
  });

  function inputCalc(input, e) {
    e.preventDefault();
    if (e.key.match(/[0-9]/) && input.value.length < 3) {
      input.value += e.key;
    } else if (e.key == 'Backspace') {
      e.target.value = e.target.value.substring(0, pos - 1);
    }
    daysSum = +input.value;

    total = (daysSum + personsSum) * 4000;
    if ((persons.value == '' || restDays.value == '' || persons.value == '0' || restDays.value == '0')) {
      totalValue.innerHTML = '0';
    } else {
      let a = total * place.value - 500;
      if (a < 0) a = 0;
      // хотите красивое увеличение стоимости вашей поездки?
      let printNum = setInterval(() => {
        if (a < total * place.value) {
          a += 5;
          totalValue.innerHTML = a;
        } else {
          clearInterval(printNum);
        }
      }, 5)
    }
  }
});