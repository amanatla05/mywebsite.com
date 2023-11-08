const body = document.querySelector("body");
const modeToggle = document.getElementById("mode-toggle");
const modeStatus = document.querySelector(".mode-status");
const items = document.querySelectorAll('.col-12');

const options = {
  threshold: 0.5
}

function addSlideIn(entries){
  entries.forEach(entry =>{
    if(entry.isIntersecting){
      entry.target.classList.add('slide-in');
    }else{
      entry.target.classList.remove('slide-in');
    }
  });
}

const observer = new IntersectionObserver(addSlideIn, options)

items.forEach(item =>{
  observer.observe(item);
})

function toggleMode() {
  body.classList.toggle('dark-mode');

  const modeMessage = body.classList.contains('dark-mode') ?
    'Dark Mode' 
    : "Light Mode"

  modeStatus.innerText = "Currently in " + modeMessage;
}
modeToggle.addEventListener('click', toggleMode);

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

openModalBtn.addEventListener("click", openModal);

const successMessage = document.getElementById('form-submitted-msg');

function checkFormValidity(elementId) {
  const errorElement = document.getElementById(`${elementId}Error`);
  const inputElement = document.getElementById(elementId);
  if (elementId === 'contactno') {
    const phoneNumberPattern = /^\d{3}-\d{3}-\d{4}$/;
    if (!phoneNumberPattern.test(inputElement.value)) {
      errorElement.textContent = 'Please enter a valid phone number in the format XXX-XXX-XXXX.';
    } else {
      errorElement.textContent = '';
    }
  } else {
    if (!inputElement.checkValidity()) {
      errorElement.textContent = 'Please enter a valid value.';
    } else {
      errorElement.textContent = '';
    }
  }
  enableSubmitButton();
}

const submitButton = document.getElementById('submitButton');

function enableSubmitButton() {
  const errorMessages = document.getElementsByClassName('error');
  for (let i = 0; i < errorMessages.length; i++) {
    if (errorMessages[i].textContent !== '') {
      submitButton.disabled = true;
      return;
    }
  }
  submitButton.disabled = false;
}


function validateForm(event) {
  event.preventDefault();
  const firstName = document.getElementById('firstname');
  const lastName = document.getElementById('lastname');
  const email = document.getElementById('email');
  const contactNo = document.getElementById('contactno');

  if (firstName.checkValidity() && lastName.checkValidity() && email.checkValidity() && contactNo.checkValidity()) {
    successMessage.style.display = 'block';
    form.reset();

    setTimeout(function() {
      successMessage.style.display = 'none';
    }, 3000);
  }
}


const form = document.querySelector('.contact');
form.addEventListener('submit', validateForm);

let directionsService;
    let directionsRenderer
    let map;
    // Initialize and add the map
    function initMap() {
      directionsService = new google.maps.DirectionsService();
      directionsRenderer = new google.maps.DirectionsRenderer();
      const coordinates = {
        lat: 43.2603371,
        lng: 80.2628072
      };
      map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: coordinates,
      });
      directionsRenderer.setMap(map);
    }

    function calcRoute() {
      let start = document.getElementById('origin').value;
      let end = document.getElementById('destination').value;
      let request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
      };
      directionsService.route(request, function(result, status) {
        if(status == 'OK') {
          directionsRenderer.setDirections(result);
        } else {
          alert("An unexpected error occurred")
        }
      });
    }