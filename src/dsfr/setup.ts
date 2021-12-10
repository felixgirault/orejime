declare global {
	interface Window {
		orejime: any;
	}
}

const setup = (orejime) => {
	console.log('oiuoiezur');
	const {manager} = orejime;
	let notice;

	const setupNotice = () => {
		notice = document.getElementById('orejime-notice').cloneNode(true) as HTMLElement;
		document.body.appendChild(notice);
		console.log('prout', notice);
	}

	if (manager.isDirty()) {
		setupNotice();
	}

	manager.on('dirty', (isDirty) => {
		if (isDirty && !notice) {
			setupNotice();
		}
	});

	notice.querySelector('[data-orejime-notice-accept]').addEventListener('click', function() {
		manager.acceptAll();
	});

	notice.querySelector('[data-orejime-notice-decline]').addEventListener('click', function() {
		manager.declineAll();
	});

	notice.querySelector('[data-orejime-notice-configure]').addEventListener('click', function() {

	});
}

if (document.orejime) {
	setup(document.orejime);
} else {
	document.addEventListener('orejime.initialized', ({detail : orejime}) => setup(orejime));
}
