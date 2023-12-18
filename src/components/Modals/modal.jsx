/* eslint-disable react/prop-types */
import CheckIcon from '@untitled-ui/icons-react/build/esm/Check';
import { Avatar, Box, Button, Container, Paper, SvgIcon, Typography } from '@mui/material';
import React from 'react';

export const Modal = ({ onClose }) => (
  <Box
    sx={{
      backgroundColor: (theme) => theme.palette.mode === 'dark'
        ? 'neutral.800'
        : 'neutral.100',
      p: 3,
      position: 'fixed',      // Añadir posición fija
      zIndex: 1000,
      top: 200,
      left: 0,
      right: 0,
      bottom: 0,

    }}
  >
    <Container maxWidth="sm">
      <Paper
        className='bg-gradient-to-r from-blue-400 to-purple-600  hover:from-blue-400 hover:to-purple-600'
        elevation={12}
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar
          sx={{
            backgroundColor: 'success.faded',
            color: 'success.main',
            mb: 2
          }}
        >
          <SvgIcon>
            <CheckIcon />
          </SvgIcon>
        </Avatar>
        <Typography variant="h5" className='text-white font-semibold'>
          Message sent successfully
        </Typography>
        <Typography
          className='text-white'
          align="center"
          color="text.secondary"
          sx={{ mt: 1 }}
          variant="body2"
        >
          Thank you for your message I will be checking it soon.
          A curiosity about this form is built in Nextjs using Lambda, API Gateway and SES from AWS. An own development!
        </Typography>
        <Button className='text-white hover:text-blue bg-gradient-to-r from-orange-400 to-red-600  hover:from-red-400 hover:to-red-600'
          fullWidth
          size="large"
          sx={{ mt: 4 }}
          variant="contained"
          onClick={onClose}
        >
          Thank you!
        </Button>
      </Paper>
    </Container>
  </Box>
);
