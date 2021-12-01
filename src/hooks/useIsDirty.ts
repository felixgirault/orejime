import {useState} from 'react';
import Manager from '../core/Manager';

export default (manager: Manager) => {
	const [isDirty, setDirty] = useState(manager.isDirty());
	manager.on('dirty', setDirty);
	return isDirty;
}
