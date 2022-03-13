class UI {
	constructor() {
		this.bookmarkBtn = document.querySelector(".bookmark-btn");
		this.bookmarkIcon = document.querySelector(".bookmark-icon");
		this.selectBtn = document.querySelectorAll(".select-btn");
		this.selectModal = document.querySelector("#select-modal");
		this.successModal = document.querySelector("#sucess-modal");
		this.closeModalBtn = document.querySelector(".close-btn");
		this.closeModalIcon = document.querySelector(".modal--close");
		this.continueBtn = document.querySelectorAll(".continue-btn");
		// data-id is the id of the radio button
		this.radioBtn = document.querySelectorAll("input[type=radio][data-id]");
		this.modalCard = document.querySelectorAll(".modal__card[data-id]");
		this.modalDonate = document.querySelectorAll(".modal__donate");
		// total amount
		this.currentTotal = parseInt(
			document.querySelector("#total__backed").textContent.split(",").join("")
		);
		this.totalBacker = parseInt(
			document.querySelector("#total__backers").textContent.split(",").join("")
		);
		this.donateInput = document.querySelectorAll(".donate__input");
		// Amount left
		// In card__reward
		this.outerLeft = document.querySelectorAll(".card .card__reward h5[data-id]");
		// In modal__card
		this.innerLeft = document.querySelectorAll(".modal__heading[data-id]");
		// Menu buttons
		this.hamburgerMenu = document.querySelector(".hamburger");
		this.closeMenu = document.querySelector(".hamburger--close");
	}

	// Bookmark button clicked
	bookmarkBtnClicked() {
		this.bookmarkBtn.classList.toggle("bookmark-btn--active");
		this.bookmarkIcon.classList.toggle("bookmark-icon--active");
	}

	// Select button clicked
	openModalBtnClicked(modal) {
		// Remove active class from previous active modal
		// if there is one
		const activeModal = document.querySelector(".active-modal");
		if (activeModal) {
			activeModal.classList.remove("active-modal");
			activeModal.style.display = "none";
			// Add active class to current modal
			modal.classList.add("active-modal");
			modal.style.display = "block";
			modal.scrollTop = 0;
		} else {
			// Add active class to current modal
			modal.classList.add("active-modal");
			modal.style.display = "block";
			modal.scrollTop = 0;
		}
		// disable window scroll
		document.body.style.overflow = "hidden";
	}

	// Close modal button clicked
	closeModalBtnClicked(modal) {
		// Remove active class from current modal
		modal.classList.remove("active-modal");
		modal.style.display = "none";
		// Clear input fields
		this.clearModalFields();
		// enable window scroll
		document.body.style.overflow = "auto";
	}

	// Radio button checked
	radioBtnChecked(radio) {
		if (radio.checked) {
			// Get the id of the radio button
			const id = radio.dataset.id;
			// Get the modal__donate that corresponds to the id
			this.modalDonate.forEach((modal) => {
				if (modal.id === `modal__donate-${id}`) {
					modal.style.display = "flex";
				} else {
					modal.style.display = "none";
				}
			});
			// Add border to modal__card that corresponds to the id
			this.modalCard.forEach((card) => {
				if (card.dataset.id === id) {
					card.classList.add("modal__card--active");
				} else {
					card.classList.remove("modal__card--active");
				}
			});
		}
	}

	// Hamburger menu clicked
	hamburgerMenuClicked() {
		const menuMobile = document.querySelector(".header__nav--mobile");
		menuMobile.style.display = "block";
		// Remove hamburger menu
		this.hamburgerMenu.style.display = "none";
		// Display close menu
		this.closeMenu.style.display = "block";
		// disable window scroll
		document.body.style.overflow = "hidden";
	}

	// Close menu clicked
	closeMenuClicked() {
		const menuMobile = document.querySelector(".header__nav--mobile");
		menuMobile.style.display = "none";
		// Display hamburger menu
		this.hamburgerMenu.style.display = "block";
		// Remove close menu
		this.closeMenu.style.display = "none";
		// enable window scroll
		document.body.style.overflow = "auto";
	}

	// Update total amount of money backed & total amount of backers
	updateTotal(card, input) {
		const goal = 100000;
		if (card.dataset.id === "0" && input === null) {
			// if it is the first modal
			// Update the total backers
			this.totalBacker++;
			// console.log(this.totalBacker);
			document.querySelector("#total__backers").textContent = this.totalBacker;
		} else if (card.dataset.id !== "0" && input !== null) {
			// If the input is not empty
			if (input.value !== "") {
				// console.log(input.value);
				this.currentTotal += parseInt(input.value);
				// Update the total
				document.querySelector("#total__backed").textContent =
					this.currentTotal.toString().slice(0, 2) +
					"," +
					this.currentTotal.toString().slice(2);
				// Update the total backers
				document.querySelector("#total__backers").textContent = ++this.totalBacker;

				// Update the amount in the inside
				this.innerLeft.forEach((inner) => {
					if (inner.dataset.id === input.dataset.id && input.value !== "") {
						let currentAmount = parseInt(inner.textContent.split(" ")[0]);
						currentAmount = currentAmount - 1;
						inner.innerHTML = `${currentAmount} <span class="span__left">left</span>`;
					}
				});

				// Update the amount in the outside
				this.outerLeft.forEach((outer) => {
					this.innerLeft.forEach((inner) => {
						if (outer.dataset.id === inner.dataset.id) {
							outer.innerHTML = inner.innerHTML;
						}
					});
				});
			}

			// Clear input fields
			this.clearModalFields();
		}

		// Update progress bar width
		this.updateProgressBar(this.currentTotal, goal);
	}

	// Update progress bar width
	updateProgressBar(total, goal) {
		const progressBar = document.querySelector("#progress");
		const progressBarWidth = (total / goal) * 100;
		progressBar.style.width = `${progressBarWidth}%`;
	}

	// Clear input fields
	clearModalFields() {
		this.donateInput.forEach((input) => {
			input.value = "";
		});
		// remove border from modal__card
		this.modalCard.forEach((card) => {
			card.classList.remove("modal__card--active");
		});
		// remove checked from radio button
		this.radioBtn.forEach((radio) => {
			radio.checked = false;
		});
		// hide modal__donate
		this.modalDonate.forEach((donate) => {
			donate.style.display = "none";
		});
	}
}
