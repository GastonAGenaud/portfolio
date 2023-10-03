import {
  Box,
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import React, { useCallback, useState, useRef } from 'react';
import axios from 'axios';
export const ContactForm = () => {
  const [selectValue, setSelectValue] = useState(20000); // Estado inicial del Select
  const handleSelectChange = useCallback((event) => {
    setSelectValue(event.target.value); // Actualizar el valor del Select
  }, []);
  const formRef = useRef(null);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    const data = {
      name: event.target.name.value,
      company: event.target.company.value,
      email: event.target.email.value,
      subject: selectValue, // <-- Cambio aquí
      message: event.target.message.value,
    };

    try {
      await axios.post('https://s8ykg8u5q2.execute-api.us-east-2.amazonaws.com/prod/contact', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email!');
    }
}, [selectValue]);


  return (
<form onSubmit={handleSubmit} ref={formRef}>
      <Grid
        container
        spacing={3}
      >
        <Grid
          xs={12}
          sm={6}
        >
          <FormControl fullWidth>
            <FormLabel
              sx={{
                color: 'text.primary',
                mb: 1
              }}
            >
              Full Name *
            </FormLabel>
            <OutlinedInput
              name="name"
              required
            />
          </FormControl>
        </Grid>
        <Grid
          xs={12}
          sm={6}
        >
          <FormControl fullWidth>
            <FormLabel
              sx={{
                color: 'text.primary',
                mb: 1
              }}
            >
              Company Name*
            </FormLabel>
            <OutlinedInput
              name="company"
              required
            />
          </FormControl>
        </Grid>
        <Grid
          xs={12}
          sm={12}
        >
          <FormControl fullWidth>
            <FormLabel
              sx={{
                color: 'text.primary',
                mb: 1
              }}
            >
              Work Email *
            </FormLabel>
            <OutlinedInput
              name="email"
              type="email"
              required
            />
          </FormControl>
        </Grid>
        <Grid xs={12}>
          <FormControl fullWidth>
            <FormLabel
              sx={{
                color: 'text.primary',
                mb: 1
              }}
            >
              Subject
            </FormLabel>
            <Select
              fullWidth
              required
              value={selectValue}
              onChange={handleSelectChange}
            >
              <MenuItem value={20000}>
                Job offer
              </MenuItem>
              <MenuItem value={30000}>
                Interview
              </MenuItem>
              <MenuItem value={40000}>
                Other
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={12}>
          <FormControl fullWidth>
            <FormLabel
              sx={{
                color: 'text.primary',
                mb: 1
              }}
            >
              Message
            </FormLabel>
            <OutlinedInput
              fullWidth
              name="message"
              required
              multiline
              rows={6}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 3
        }}
      >
        <Button
          fullWidth
          size="large"
          variant="contained"
          className='text-white hover:text-white bg-gradient-to-r from-orange-400 to-red-600  hover:from-red-400 hover:to-red-600'
          type="submit"
        >
          Let&apos;s Talk
        </Button>
      </Box>
      <Typography
        color="text.secondary"
        sx={{ mt: 3 }}
        variant="body2"
      >
        I appreciate your interest and am looking forward to hearing from you soon!
      </Typography>
    </form>
  );
};
