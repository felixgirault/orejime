document
	.querySelector('[data-orejime-open]')
	.addEventListener('click', function () {
		window.orejime.show();
	});

document
	.querySelector('[data-orejime-reset]')
	.addEventListener('click', function () {
		window.orejime.manager.clearConsents();
	});

document
	.querySelector('[data-orejime-preload]')
	.addEventListener('focus', function () {
		window.orejime.preload();
	});

document
	.querySelector('[data-orejime-preload]')
	.addEventListener('mouseover', function () {
		window.orejime.preload();
	});
