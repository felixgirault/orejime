import {createContext} from 'react';
import {Manager} from '../../core';
import {Config} from '../types';

export interface InstanceContextType {
	config: Config;
	manager: Manager;
}

export const InstanceContext = createContext<InstanceContextType>(
	{} as InstanceContextType
);
