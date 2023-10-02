"use client";
import React from 'react';
import { useState } from 'react';
import {
    Box,
    Button,
    Container,
    Stack,
    SvgIcon,
    Typography,
    Unstable_Grid2 as Grid
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LinkExternal01Icon from '@untitled-ui/icons-react/build/esm/LinkExternal01';
const features = [
    {
      id: 'cypress',
      title: 'Cypress',
      description: 'I have a solid understanding of Cypress, allowing me to write, debug, and maintain end-to-end tests efficiently.',
      imageDark: '/features/cypress.png',
      imageLight: '/features/cypress.png'
    },
    {
      id: 'selenium',
      title: 'Selenium',
      description: 'With Selenium, I can automate tests across different browsers and platforms, ensuring software compatibility and quality.',
      imageDark: '/features/selenium.svg',
      imageLight: '/features/selenium.svg'
    },
    {
      id: 'gherkins',
      title: 'Gherkins',
      description: 'I use Gherkins to write human-readable specifications that describe software behavior without detailing how it\'s implemented.',
      imageDark: '/features/gherkins.png',
      imageLight: '/features/gherkins.png'
    },
    {
      id: 'appium',
      title: 'Appium',
      description: 'I apply Appium to automate tests on native, hybrid, and mobile web applications, facilitating cross-platform verification.',
      imageDark: '/features/appium.png',
      imageLight: '/features/appium.png'
    },
    {
      id: 'aws',
      title: 'AWS',
      description: 'I have experience working with AWS, allowing me to deploy, monitor, and maintain applications in the cloud effectively.',
      imageDark: '/features/aws.png',
      imageLight: '/features/aws.png'
    }
  ];

export const HomeFeatures = () => {
  const theme = useTheme();
  const [activeFeature, setActiveFeature] = useState(0);
  const feature = features[activeFeature];
  const image = theme.palette.mode === 'dark' ? feature?.imageDark : feature?.imageLight;

  return (
    <Box
      sx={{
        backgroundColor: 'neutral.800',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
        //backgroundImage: 'url("/assets/gradient-bg.svg")',
        color: 'common.white',
        py: '120px'
      }}
    >
      <Container maxWidth="lg">
        <Stack
          spacing={2}
          sx={{ mb: 8 }}
        >
          <Typography
            align="center"
            color="inherit"
            variant="h3"
          >
            My Technical Skills
          </Typography>
          <Typography
            align="center"
            color="inherit"
            variant="subtitle2"
          >
            Tools and technologies I use to ensure software quality.
          </Typography>
        </Stack>
        <Grid
          alignItems="center"
          container
          spacing={3}
        >
          <Grid
            xs={12}
            md={6}
          >
            <Stack spacing={1}>
              {features.map((feature, index) => {
                const isActive = activeFeature === index;

                return (
                  <Box
                    key={feature.id}
                    onClick={() => setActiveFeature(index)}
                    sx={{
                      borderRadius: 2.5,
                      color: 'neutral.400',
                      cursor: 'pointer',
                      p: 3,
                      transition: (theme) => theme.transitions.create([
                        'background-color, box-shadow',
                        'color'
                      ], {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen
                      }),
                      ...(isActive && {
                        backgroundColor: 'primary.alpha12',
                        boxShadow: (theme) => `${theme.palette.primary.main} 0 0 0 1px`,
                        color: 'common.white'
                      }),
                      '&:hover': {
                        ...(!isActive && {
                          backgroundColor: 'primary.alpha4',
                          boxShadow: (theme) => `${theme.palette.primary.main} 0 0 0 1px`,
                          color: 'common.white'
                        })
                      }
                    }}
                  >
                    <Typography
                      color="inherit"
                      sx={{ mb: 1 }}
                      variant="h6"
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      color="inherit"
                      variant="body2"
                    >
                      {feature.description}
                    </Typography>
                    {feature.id === 'figma' && (
                      <Box sx={{ mt: 3 }}>
                        <Button
                          color="success"
                          component="a"
                          endIcon={(
                            <SvgIcon fontSize="small">
                              <LinkExternal01Icon />
                            </SvgIcon>
                          )}
                          href="https://www.figma.com/file/xrx6uDljzsWuDZiuz3ITCp/Devias-Kit-Pro-UI-6.0-Master"
                          size="small"
                          target="_blank"
                          variant="contained"
                        >
                          Preview in Figma
                        </Button>
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Stack>
          </Grid>
          <Grid
            xs={12}
            md={6}
          >
            <Box
              sx={{
                '& img': {
                  width: '100%'
                }
              }}
            >
              <img src={image} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
