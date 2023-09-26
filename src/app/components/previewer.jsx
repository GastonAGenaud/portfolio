"use client"
import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardHeader, Divider, IconButton, SvgIcon, ThemeProvider } from '@mui/material';
import { useSettings } from 'src/hooks/use-settings';
import { createTheme } from '../client/theme';

export const Previewer = (props) => {
  const { children, title, ...other } = props;
  const settings = useSettings();
  const [paletteMode, setPaletteMode] = useState('dark'); // Modo oscuro por defecto
  const theme = useMemo(() => {
    return createTheme({
      ...settings,
      paletteMode
    });
  }, [settings, paletteMode]);

  useEffect(() => {
    setPaletteMode('dark');
  }, [settings.paletteMode]);

  const handleModeSwitch = useCallback(() => {
    setPaletteMode((prevState) => {
      return prevState === 'light' ? 'dark' : 'light';
    });
  }, []);

  return (
    <Card variant="outlined" {...other} sx={{
      p: 0,
      m: 0, // Asegurándote de que no haya margen.
      border: 0, // Asegurándote de que no haya borde.
    }}>
      <ThemeProvider theme={theme}>
        <Box sx={{ colorScheme: paletteMode,
        }}>
          {children}
        </Box>
      </ThemeProvider>
    </Card>
  );
};

Previewer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};
