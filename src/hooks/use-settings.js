import { useContext } from 'react';
import { SettingsContext } from '@/context/settings-context';
export const useSettings = () => useContext(SettingsContext);
