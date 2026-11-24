/* =================================
   1. MOBILE NAVIGATION
================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

  menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    }
  });
}


/* =================================
   2. CLOSE MOBILE MENU
================================= */

const navItems = navLinks.querySelectorAll("a");

navItems.forEach(function (item) {
  item.addEventListener("click", function () {
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});


/* =================================
   3. AUTOMATIC FOOTER YEAR
================================= */

const yearElement = document.getElementById("year");

yearElement.textContent = new Date().getFullYear();


/* =================================
   4. CLOSE MENU ON RESIZE
================================= */

window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  }
});


/* =================================
   5. FOOD MENU FILTER
================================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll(".menu-card");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {

    const selectedFilter = button.dataset.filter;

    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    menuCards.forEach(function (card) {
      const category = card.dataset.category;

      if (
        selectedFilter === "all" ||
        selectedFilter === category
      ) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });

  });
});



/* =================================
   6. RESERVATION FORM - DEMO MODE
================================= */

const reservationForm = document.getElementById("reservationForm");
const formMessage = document.getElementById("formMessage");
const reservationDate = document.getElementById("reservationDate");


/* Prevent selecting past dates */

const today = new Date();

const localToday = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0")
].join("-");

reservationDate.min = localToday;


/* Reservation Form Submit */

reservationForm.addEventListener("submit", function (event) {

  event.preventDefault();

  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const date = reservationDate.value;
  const time = document.getElementById("reservationTime").value;
  const guests = document.getElementById("guestCount").value;

  // Validate phone number

  if (!/^[0-9]{10}$/.test(phone)) {
    formMessage.textContent =
      "Please enter a valid 10-digit phone number.";

    formMessage.style.color = "#c0392b";
    return;
  }

  // Validate reservation date

  if (date < localToday) {
    formMessage.textContent =
      "Please select today or a future date.";

    formMessage.style.color = "#c0392b";
    return;
  }

  // Demo success message

  formMessage.textContent =
    "Thank you, " + name +
    "! Your demo reservation enquiry has been submitted successfully.";

  formMessage.style.color = "#173d2b";

  // Clear form after successful demo submission

  reservationForm.reset();

  // Keep past dates disabled

  reservationDate.min = localToday;

});
