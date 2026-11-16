/* =========================================================
   EVENT DATA
========================================================= */

const events = [
  {
    day: '10',
    month: 'OCT',
    title: 'HackIEM 2026',
    category: 'technical',
    label: 'Technical',
    date: '2026-10-10T09:00:00+05:30',
    venue: 'AIML Lab / Gurukul Campus',
    description:
      'A 24-hour hackathon where teams turn machine-learning ideas into practical prototypes.'
  },

  {
    day: '17',
    month: 'OCT',
    title: 'Hands-on Deep Learning with PyTorch',
    category: 'workshop',
    label: 'Workshop',
    date: '2026-10-17T10:00:00+05:30',
    venue: 'Lab 4 / Abraham Building',
    description:
      'A practical session covering tensors, autograd, CNNs and a small speech-emotion classifier.'
  },

  {
    day: '24',
    month: 'OCT',
    title: 'Large Language Models for Indian Languages',
    category: 'lecture',
    label: 'Lecture',
    date: '2026-10-24T14:30:00+05:30',
    venue: 'Seminar Hall / 2nd Floor',
    description:
      'A guest lecture exploring language models, evaluation and low-resource Indic language applications.'
  },

  {
    day: '31',
    month: 'OCT',
    title: 'Sharod Sandhya',
    category: 'cultural',
    label: 'Cultural',
    date: '2026-10-31T17:00:00+05:30',
    venue: 'Main Auditorium',
    description:
      'An evening of music, culture and student performances celebrating creativity beyond code.'
  },

  {
    day: '07',
    month: 'NOV',
    title: 'Line-Follower Robotics Challenge',
    category: 'technical',
    label: 'Technical',
    date: '2026-11-07T11:00:00+05:30',
    venue: 'Robotics Lab',
    description:
      'Build, test and race an autonomous line-following robot in a hands-on team challenge.'
  },

  {
    day: '14',
    month: 'NOV',
    title: 'AI in Everyday Products',
    category: 'lecture',
    label: 'Lecture',
    date: '2026-11-14T15:00:00+05:30',
    venue: 'Seminar Hall / Ground Floor',
    description:
      'An accessible talk on how machine learning quietly shapes search, recommendations and digital products.'
  }
];


/* =========================================================
   GALLERY
========================================================= */

const gallery = [
  ['images/event1.svg', 'HackIEM / 01'],
  ['images/event2.svg', 'Deep Learning / 02'],
  ['images/event3.svg', 'Guest Lecture / 03'],
  ['images/event4.svg', 'Student Life / 04'],
  ['images/event5.svg', 'Robotics / 05'],
  ['images/event6.svg', 'Cultural / 06']
];


/* =========================================================
   SHORT SELECTORS
========================================================= */

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);


/* =========================================================
   EVENTS
========================================================= */

const eventList = $('#eventList');
const eventSelect = $('#eventSelect');


function formatDate(value) {

  return new Date(value).toLocaleString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  });

}


function renderEvents(category = 'all') {

  const visible = events.filter(
    event =>
      category === 'all' ||
      event.category === category
  );


  eventList.innerHTML = visible
    .map((event, index) => {

      return `
        <article class="event reveal visible">

          <div class="event-date">
            <strong>${event.day}</strong>
            <span>${event.month}</span>
          </div>

          <div class="event-info">

            <span class="tag">
              ${event.label} / 0${index + 1}
            </span>

            <h3>${event.title}</h3>

            <p>
              ${event.description}
            </p>

            <small>
              ${formatDate(event.date)}
              ·
              ${event.venue}
            </small>

          </div>

          <div class="event-kind">
            ${event.label}
          </div>

        </article>
      `;

    })
    .join('');


  if ($('#emptyState')) {
    $('#emptyState').hidden = visible.length !== 0;
  }


  if ($('#eventCount')) {
    $('#eventCount').textContent =
      String(visible.length).padStart(2, '0');
  }

}


/* Initial events */

renderEvents();


/* =========================================================
   EVENT SELECT DROPDOWN
========================================================= */

function fillEventSelect() {

  if (!eventSelect) return;

  eventSelect.innerHTML =
    '<option value="">Select an event</option>' +

    events
      .map(event =>
        `<option value="${event.title}">
          ${event.title}
        </option>`
      )
      .join('');

}


fillEventSelect();


/* =========================================================
   EVENT FILTER BUTTONS
========================================================= */

$$('.filter').forEach(button => {

  button.addEventListener('click', () => {

    const active = $('.filter.active');

    if (active) {
      active.classList.remove('active');
    }

    button.classList.add('active');

    renderEvents(button.dataset.category);

  });

});


/* =========================================================
   DIGITAL CLOCK
========================================================= */

function updateClock() {

  const clock = $('#clock');

  if (!clock) return;

  const now = new Date();

  clock.textContent =
    now.toLocaleTimeString('en-IN', {
      hour12: false,
      timeZone: 'Asia/Kolkata'
    }) + ' IST';

}


updateClock();

setInterval(updateClock, 1000);


/* =========================================================
   EVENT COUNTDOWN
========================================================= */

const nextEvent = new Date(
  events[0].date
).getTime();


function updateCountdown() {

  const difference =
    Math.max(0, nextEvent - Date.now());


  const days =
    Math.floor(difference / 86400000);

  const hours =
    Math.floor(difference / 3600000) % 24;

  const minutes =
    Math.floor(difference / 60000) % 60;

  const seconds =
    Math.floor(difference / 1000) % 60;


  if ($('#days')) {
    $('#days').textContent =
      String(days).padStart(2, '0');
  }

  if ($('#hours')) {
    $('#hours').textContent =
      String(hours).padStart(2, '0');
  }

  if ($('#minutes')) {
    $('#minutes').textContent =
      String(minutes).padStart(2, '0');
  }

  if ($('#seconds')) {
    $('#seconds').textContent =
      String(seconds).padStart(2, '0');
  }

}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

const themeBtn = $('#themeBtn');


function setTheme(mode) {

  document.body.classList.toggle(
    'dark',
    mode === 'dark'
  );

  localStorage.setItem(
    'iem-theme',
    mode
  );


  if (themeBtn) {

    themeBtn.textContent =
      mode === 'dark'
        ? '☀'
        : '☼';

  }

}


setTheme(
  localStorage.getItem('iem-theme') || 'light'
);


if (themeBtn) {

  themeBtn.addEventListener(
    'click',
    () => {

      setTheme(
        document.body.classList.contains('dark')
          ? 'light'
          : 'dark'
      );

    }
  );

}


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = $('#menuBtn');
const navLinks = $('#navLinks');


if (menuBtn && navLinks) {

  menuBtn.addEventListener(
    'click',
    () => {

      const open =
        navLinks.classList.toggle('show');

      menuBtn.setAttribute(
        'aria-expanded',
        open
      );

      menuBtn.textContent =
        open ? '×' : '☰';

    }
  );

}


$$('.nav-links a').forEach(link => {

  link.addEventListener(
    'click',
    () => {

      if (navLinks) {
        navLinks.classList.remove('show');
      }

      if (menuBtn) {

        menuBtn.setAttribute(
          'aria-expanded',
          'false'
        );

        menuBtn.textContent = '☰';

      }

    }
  );

});


/* =========================================================
   GALLERY
========================================================= */

const galleryGrid = $('#galleryGrid');


if (galleryGrid) {

  galleryGrid.innerHTML = gallery
    .map(([src, title]) => {

      return `
        <figure class="gallery-item reveal">

          <img
            src="${src}"
            alt="${title}"
          >

          <figcaption class="overlay">
            <span>${title}</span>
          </figcaption>

        </figure>
      `;

    })
    .join('');

}


/* =========================================================
   FORM ERROR FUNCTIONS
========================================================= */

function error(id, message) {

  const element = $('#' + id);

  if (element) {
    element.textContent = message;
  }

}


function clearErrors() {

  $$('.error').forEach(element => {

    element.textContent = '';

  });

}


/* =========================================================
   REGISTRATION FORM
========================================================= */

const registrationForm =
  $('#registrationForm');


if (registrationForm) {

  registrationForm.addEventListener(
    'submit',
    function (e) {

      e.preventDefault();

      clearErrors();


      /* -------------------------
         GET FORM VALUES
      ------------------------- */

      const name =
        $('#name').value.trim();

      const roll =
        $('#roll').value.trim();

      const email =
        $('#email').value.trim();

      const phone =
        $('#phone').value.trim();

      const department =
        $('#department').value;

      const selectedEvent =
        $('#eventSelect').value;

      const gender =
        document.querySelector(
          'input[name="gender"]:checked'
        );


      let valid = true;


      /* -------------------------
         NAME VALIDATION
      ------------------------- */

      if (!/^[A-Za-z ]{2,}$/.test(name)) {

        error(
          'nameError',
          'Enter a valid name.'
        );

        valid = false;

      }


      /* -------------------------
         ROLL NUMBER
      ------------------------- */

      if (!/^\d{10}$/.test(roll)) {

        error(
          'rollError',
          'Roll number must contain 10 digits.'
        );

        valid = false;

      }


      /* -------------------------
         EMAIL
      ------------------------- */

      if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ) {

        error(
          'emailError',
          'Enter a valid email.'
        );

        valid = false;

      }


      /* -------------------------
         PHONE
      ------------------------- */

      if (!/^[6-9]\d{9}$/.test(phone)) {

        error(
          'phoneError',
          'Enter a valid 10-digit mobile number.'
        );

        valid = false;

      }


      /* -------------------------
         DEPARTMENT
      ------------------------- */

      if (!department) {

        error(
          'departmentError',
          'Select your department.'
        );

        valid = false;

      }


      /* -------------------------
         EVENT
      ------------------------- */

      if (!selectedEvent) {

        error(
          'eventError',
          'Select an event.'
        );

        valid = false;

      }


      /* -------------------------
         GENDER
      ------------------------- */

      if (!gender) {

        error(
          'genderError',
          'Select an option.'
        );

        valid = false;

      }


      /* =================================================
         SUCCESS
      ================================================= */

      if (valid) {

        const successScreen =
          $('#successScreen');

        const successName =
          $('#successName');

        const successEvent =
          $('#successEvent');

        const successDepartment =
          $('#successDepartment');


        /* Put user information
           into success screen */

        if (successName) {
          successName.textContent =
            name + '!';
        }


        if (successEvent) {
          successEvent.textContent =
            selectedEvent;
        }


        if (successDepartment) {
          successDepartment.textContent =
            department;
        }


        /* Hide the form */

        registrationForm.style.display =
          'none';


        /* Show success screen */

        if (successScreen) {

          successScreen.classList.add(
            'show'
          );

        }


        /* Reset form */

        registrationForm.reset();


        /* Create confetti */

        createConfetti();

      }

    }
  );

}


/* =========================================================
   CONFETTI
========================================================= */

function createConfetti() {

  const successScreen =
    $('#successScreen');

  if (!successScreen) return;


  const colors = [
    '#f4a261',
    '#edf1f7',
    '#8795a8',
    '#ffffff'
  ];


  for (let i = 0; i < 80; i++) {

    const confetti =
      document.createElement('span');


    confetti.classList.add(
      'confetti'
    );


    confetti.style.left =
      Math.random() * 100 + '%';


    confetti.style.background =
      colors[
        Math.floor(
          Math.random() * colors.length
        )
      ];


    confetti.style.animationDelay =
      Math.random() * 0.5 + 's';


    confetti.style.transform =
      `rotate(${Math.random() * 360}deg)`;


    successScreen.appendChild(
      confetti
    );


    setTimeout(() => {

      confetti.remove();

    }, 3500);

  }

}


/* =========================================================
   REGISTER AGAIN
========================================================= */

const registerAgain =
  $('#registerAgain');


if (registerAgain) {

  registerAgain.addEventListener(
    'click',
    () => {

      const successScreen =
        $('#successScreen');


      /* Hide success screen */

      if (successScreen) {

        successScreen.classList.remove(
          'show'
        );

      }


      /* Show registration form */

      if (registrationForm) {

        registrationForm.style.display =
          'block';

      }


      /* Scroll back to form */

      const registerSection =
        $('#register');


      if (registerSection) {

        window.scrollTo({

          top:
            registerSection.offsetTop - 80,

          behavior: 'smooth'

        });

      }

    }
  );

}


/* =========================================================
   FEEDBACK FORM
========================================================= */

const feedbackForm = $('#feedbackForm');
const feedbackSuccess = $('#feedbackSuccess');
const feedbackSuccessName = $('#feedbackSuccessName');
const feedbackAgain = $('#feedbackAgain');

if (feedbackForm) {

    feedbackForm.addEventListener('submit', e => {

        e.preventDefault();

        const name = $('#feedbackName').value.trim();

        if (!name) {
            return;
        }

        // Put user's name into success message
        feedbackSuccessName.textContent = name + ".";

        // Hide form
        feedbackForm.style.display = 'none';

        // Show success screen
        feedbackSuccess.classList.add('show');

    });

}


/* SEND ANOTHER MESSAGE */

if (feedbackAgain) {

    feedbackAgain.addEventListener('click', () => {

        // Hide success screen
        feedbackSuccess.classList.remove('show');

        // Show form again
        feedbackForm.style.display = 'block';

        // Clear previous form values
        feedbackForm.reset();

        // Scroll slightly to contact section
        document
            .querySelector('#contact')
            ?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            'visible'
          );

        }

      });

    },
    {
      threshold: 0.12
    }
  );


$$('.reveal').forEach(
  element => observer.observe(element)
);


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const dot = $('#cursorDot');


if (
  dot &&
  window.matchMedia(
    '(pointer:fine)'
  ).matches
) {

  window.addEventListener(
    'mousemove',
    e => {

      dot.style.left =
        e.clientX + 'px';

      dot.style.top =
        e.clientY + 'px';

    }
  );


  $$('.magnetic').forEach(element => {

    element.addEventListener(
      'mousemove',
      e => {

        const rect =
          element.getBoundingClientRect();


        const x =
          (e.clientX -
            rect.left -
            rect.width / 2) * 0.12;


        const y =
          (e.clientY -
            rect.top -
            rect.height / 2) * 0.12;


        element.style.transform =
          `translate(${x}px, ${y}px)`;

      }
    );


    element.addEventListener(
      'mouseleave',
      () => {

        element.style.transform = '';

      }
    );

  });

}