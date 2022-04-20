import {createContext} from 'react';
import type {Manager} from '../../core';
import type {Config} from '../types';

export interface InstanceContextType {
	config: Config;
	manager: Manager;
}

export const InstanceContext = createContext<InstanceContextType>(
	{} as InstanceContextType
);
