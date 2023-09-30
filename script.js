// Write your code below
// Write your code below
const body = document.querySelector("body");
const modeToggle = document.getElementById("mode-toggle");
const modeStatus = document.querySelector(".mode-status")
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

// close modal function
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// close the modal when the close button and overlay is clicked
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// close modal when the Esc key is pressed
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// open modal function
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
// open modal event
openModalBtn.addEventListener("click", openModal);
