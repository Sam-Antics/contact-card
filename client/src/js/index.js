// import functions
import { initDb, getDb, postDb, deleteDb, editDb } from "./database";
import { fetchCards } from "./cards";
import { toggleForm, clearForm } from "./form";

// import CSS & Bootstrap
import "../css/index.css";
import { Tooltip, Toast, Popover } from "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

// import images
import Logo from '../images/logo.png';
import Bear from '../images/bear.png';
import Dog from '../images/dog.png';
import Sam from '../images/sam-avatar.png';

// "on load" functionality
window.addEventListener('load', function() {
  initDb();
  fetchCards();

  document.getElementById('logo').src = Sam;
  document.getElementById('bearThumbnail').src = Bear;
  document.getElementById('dogThumbnail').src = Dog;
});

// Form functionality
const form = document.getElementById("formToggle");
const newContactButton = document.getElementById("new-contact");
let submitBtnToUpdate = false;
let profileId;
  
newContactButton.addEventListener('click', event => {
  toggleForm()
  })
  
form.addEventListener('submit', (event) => {
  // Handle data
  event.preventDefault();
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let profile = document.querySelector('input[type="radio"]:checked').value;
  
  // Post form data to IndexedDB OR Edit an existing card in IndexedDB
  if (submitBtnToUpdate == false) {
    postDb(name, email, phone, profile);
  } else {

  // obtains values passed into the form element
  let name = document.getElementById('name').value;
  let phone = document.getElementById('phone').value;
  let email = document.getElementById('email').value;
  let profile = document.querySelector('input[type="radio"]:checked').value;

  // calls the editDB function passing in any values from the form element as well as the ocntact that is being updated
  editDb(profileId, name, email, phone, profile);
  
  fetchCards();

  // Toggles the submit button back to POST functionality
  submitBtnToUpdate = false;
  }
    
  // Clear form
  clearForm();
  // Toggle form
  toggleForm();
  // Reload the DOM
  fetchCards();
})

// card functionality
// Adds deleteCard() to the global scope (so each card has access to it)
window.deleteCard = (e) => {
  // grabs the id from the button element attached to the contact card
  let id = parseInt(e.id);
  // DELETE the card
  deleteDb(id);
  // Reload the DOM
  fetchCards();
};

// POST function
window.editCard = (e) => {
  // grabs the id from the button element attached to the contact card and sets a global variable that will be used in the form element.
  profileId = parseInt(e.dataset.id);

  // grabs information to pre-populate edit form
  let editName = e.dataset.name;
  let editEmail = e.dataset.email;
  let editPhone = e.dataset.phone;

  document.getElementById('name').value = editName;
  document.getElementById('email').value = editEmail;
  document.getElementById('phone').value = editPhone;

  form.style.display = "block";

  // Toggles the submit button so that it updates an existing card instead of posting a new one
  submitBtnToUpdate = true;
};  
    