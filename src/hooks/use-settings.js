import { useContext } from 'react';
import { SettingsContext } from '../app/client/theme/contexts/settings-context';

export const useSettings = () => useContext(SettingsContext);
