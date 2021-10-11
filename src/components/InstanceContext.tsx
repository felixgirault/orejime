import {createContext} from 'react';
import ConsentManager from '../ConsentManager';
import {Config, CssNamespace, Translate} from '../types';

export interface InstanceContextType {
	t: Translate;
	ns: CssNamespace;
	config: Config;
	manager: ConsentManager;
}

export const InstanceContext = createContext<InstanceContextType>(null);
