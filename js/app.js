const ui = new UI();

// Update progress bar on window load
ui.updateProgressBar(ui.currentTotal, 100000);

// Close current open element when click outside of element
// Tablet & above
if (window.innerWidth > 576) {
	window.addEventListener("click", (e) => {
		// console.log(e.target);
		// console.log(e.type);
		if (e.target.classList.contains("active-modal")) {
			ui.closeModalBtnClicked(e.target);
		} else if (e.target.classList.contains("header__nav--mobile")) {
			ui.closeMenuClicked();
		}
	});
} else {
	// Mobile
	// Close current open element when touch outside of element
	window.addEventListener("touchend", (e) => {
		// console.log(e.type);
		// console.log(e.target);
		e.preventDefault();
		if (e.target.classList.contains("active-modal")) {
			ui.closeModalBtnClicked(e.target);
		} else if (e.target.classList.contains("header__nav--mobile")) {
			ui.closeMenuClicked();
		}
	});
}

// Listen for click on bookmark button
ui.bookmarkBtn.addEventListener("click", (e) => {
	ui.bookmarkBtnClicked();
	e.preventDefault();
});

// Listen for click on bookmark icon
ui.bookmarkIcon.addEventListener("click", () => {
	ui.bookmarkBtnClicked();
});

// Listen for click on select button
ui.selectBtn.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		ui.openModalBtnClicked(ui.selectModal);
		e.preventDefault();
	});
});

// Listen for click on close modal icon
ui.closeModalIcon.addEventListener("click", () => {
	ui.closeModalBtnClicked(ui.selectModal);
});

// Listen for click on continue button
ui.continueBtn.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		ui.openModalBtnClicked(ui.successModal);
		ui.updateTotal(
			btn.parentElement.parentElement,
			btn.previousElementSibling !== null ? btn.previousElementSibling.childNodes[1] : null
		);
		e.preventDefault();
	});
});

// Listen for click on close modal button
ui.closeModalBtn.addEventListener("click", (e) => {
	ui.closeModalBtnClicked(ui.successModal);
	e.preventDefault();
});

// Listen for click on radio button
ui.radioBtn.forEach((radio) => {
	radio.addEventListener("click", () => {
		ui.radioBtnChecked(radio);
	});
});

// Listen for click on hamburger menu
ui.hamburgerMenu.addEventListener("click", () => {
	ui.hamburgerMenuClicked();
});

// Listen for click on close menu
ui.closeMenu.addEventListener("click", () => {
	ui.closeMenuClicked();
});
