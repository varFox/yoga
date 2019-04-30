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

const timer = document.querySelector('#timer'),
      hs = timer.querySelector('.hours'),
      ms = timer.querySelector('.minutes'),
      ss = timer.querySelector('.seconds');

function time(h, m, s) {
  let hours = h,
      minutes = m,
      seconds = s;     
  let t = setInterval(function() {
    hs.textContent = zero(hours);
    ms.textContent = zero(minutes);
    ss.textContent = zero(seconds);
    (seconds > 0) ? seconds -=1 : (seconds == 0 && minutes > 0) 
                  ? (seconds = 59, minutes -= 1) : (seconds == 0 && minutes == 0 && hours > 0) 
                  ? (seconds = 59, minutes = 59, hours -= 1) 
                  : (clearInterval(t), hs.textContent = '00', ms.textContent = '00', ss.textContent = '00');
    

  }, 1000);
}

time(10, 0, 0);