"use client"
import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card'
import { useSettings } from '@/hooks/use-settings';
import { createUITheme } from '@/app/client/theme';
import {
  Stack,
  Typography
} from '@mui/material';

export const Previewer = (props) => {
  const { children, ...other } = props;
  const settings = useSettings();
  const [paletteMode, setPaletteMode] = useState('dark'); // Modo oscuro por defecto
  const theme = useMemo(() => {
    return createUITheme({
      ...settings,
      paletteMode
    });
  }, [settings, paletteMode]);

  useEffect(() => {
    setPaletteMode('dark');
  }, [settings.paletteMode]);


  return (
    <>
      <Stack
        spacing={2}
        sx={{ mb: 8 }}
      >
        <Typography
          align="center"
          color="inherit"
          variant="h3"
        >
          My personal projects on github
        </Typography>
        <Typography
          align="center"
          color="inherit"
          variant="subtitle2"
        >
          Test automation projects and miscellaneous projects.
        </Typography>
      </Stack>
      <Card variant="outlined" {...other} sx={{
        p: 0,
        m: 0,
        border: 0,
      }}>
        <ThemeProvider theme={theme}>
          <Box sx={{
            colorScheme: paletteMode,
          }}>
            {children}
          </Box>
        </ThemeProvider>
      </Card></>
  );
};

Previewer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};
