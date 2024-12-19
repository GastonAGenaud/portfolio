import { SettingsContext } from '@/context/settings-context';

import { useContext } from 'react';
export const useSettings = () => useContext(SettingsContext);
