window.addEventListener('DOMContentLoaded', function() {
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
    item.addEventListener('click', function (e) {
      e.preventDefault(); 
      let blockID = item.getAttribute('href');
      console.log(item.getAttribute('href'));
      
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
        hs = Math.floor(t /(1000 * 60 * 60)),
        ms = Math.floor((t / 1000 / 60) % 60),
        ss = Math.floor((t / 1000) % 60);
    return {
      'total' : t,
      'hours' : hs,
      'minutes' : ms,
      'seconds' : ss
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
      hours.textContent = zero(t.hours) ;
      console.log(t.hours);
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
});





