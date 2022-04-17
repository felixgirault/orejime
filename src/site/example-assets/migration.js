import {migrateConfig, migrateTranslations} from '../../migrations/v3';

document.getElementById('configForm').addEventListener('submit', (event) => {
	event.preventDefault();

	let config = {};
	eval('config = ' + document.getElementById('configInput').value);

	const output = document.getElementById('configOutput');
	output.classList.remove('is-hidden');
	output.innerText = JSON.stringify(migrateConfig(config), null, 2);
});
