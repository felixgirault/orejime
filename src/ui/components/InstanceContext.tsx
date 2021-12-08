import {createContext} from 'react';
import {Manager} from '../../core';
import {Config, CssNamespace, Translate} from '../types';

export interface InstanceContextType {
	t: Translate;
	ns: CssNamespace;
	config: Config;
	manager: Manager;
}

export const InstanceContext = createContext<InstanceContextType>(
	{} as InstanceContextType
);
