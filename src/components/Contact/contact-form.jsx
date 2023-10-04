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
import useForm from '@/hooks/use-form';
import useContactForm from '@/hooks/use-contactForm';

export const ContactForm = () => {
  const [subject, setSubject] = useState("Job offer"); // Estado inicial del Select

  const handleSubjectChange = useCallback((event) => {
    setSubject(event.target.value); // Actualizar el valor del Select
  }, []);

  const formRef = useRef(null);

  const { values: formValues, updateValue, resetValues } = useForm({
    name: "",
    company: "",
    email: "",
    message: "",
  });

  const values = { ...formValues, subject }; // Agregando el subject al objeto values

  const { name, company, email, message } = values;
  const { loading, outputMessage, submitContactForm } = useContactForm({
    values,
    resetValues,
  });



  return (
<form onSubmit={submitContactForm} ref={formRef}>
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
              onChange={updateValue}
              value={name}
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
              onChange={updateValue}
              value={company}
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
              onChange={updateValue}
              value={email}
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
            value={subject}
            onChange={handleSubjectChange}
          >
            <MenuItem value={"Job offer"}>
              Job offer
            </MenuItem>
            <MenuItem value={"Interview"}>
              Interview
            </MenuItem>
            <MenuItem value={"Other"}>
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
              onChange={updateValue}
              value={message}
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
          {loading ? "Sending.." : "Let\\' s Talk"}

        </Button>
      </Box>
      <Typography
        color="text.secondary"
        sx={{ mt: 3 }}
        variant="body2"
      >
        I appreciate your interest and am looking forward to hearing from you soon!
      </Typography>
      <p
        className={`text-md lg:text-base mt-6 ${
          !outputMessage ? "animate-pulse" : ""
        }`}
      >
        {outputMessage || "Awaiting Submission..."}
      </p>
    </form>

  );
};
