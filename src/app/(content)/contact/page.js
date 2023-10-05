'use client'
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import Mail01Icon from '@untitled-ui/icons-react/build/esm/Mail01';
import { Avatar, Box, Container, Link, Stack, SvgIcon, Typography } from '@mui/material';
import { RouterLink } from '@/components/Shared/Router/router-link';
import { Seo } from '@/components/Shared/seo';
import {usePageView} from '../../../hooks/use-page-view';
import { ContactForm } from '../../../components/Contact/contact-form';
import React, {useState, useEffect} from 'react';
import { Modal } from '@/components/Modals/modal';
const Page = () => {
  usePageView();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
  }, [isModalOpen]);

  return (
    <>
                      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
      <Seo title="Contact" />
      <Box
        component="main"
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            lg: 'repeat(2, 1fr)',
            xs: 'repeat(1, 1fr)'
          },
          flexGrow: 1
        }}
      >
        <Box
          sx={{
            backgroundColor: (theme) => theme.palette.mode === 'dark'
              ? 'neutral.800'
              : 'neutral.50',
            py: 8
          }}
        >
          <Container
            maxWidth="md"
            sx={{ pl: { lg: 15 } }}
          >
            <Stack spacing={3}>
              <div>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href='/'
                  sx={{
                    alignItems: 'center',
                    display: 'inline-flex'
                  }}
                  underline="hover"
                >
                  <SvgIcon sx={{ mr: 1, backgroundColor: '#f97316' }}>
                    <ArrowLeftIcon />
                  </SvgIcon>
                  <Typography variant="subtitle2" className='text-orange-500' >
                    Home
                  </Typography>
                </Link>
              </div>
              <Typography variant="h3">
                Contact
              </Typography>
            </Stack>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{
                mb: 6,
                mt: 8
              }}
            >
              <Avatar
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText'
                }}
                variant="rounded"
              >
                <SvgIcon>
                  <Mail01Icon />
                </SvgIcon>
              </Avatar>
              <Typography variant="overline">
                gastongenaudar@gmail.com
              </Typography>
            </Stack>
            <Typography
              sx={{ mb: 3 }}
              variant="h1"
            >
              Hello!
            </Typography>
            <Typography
              sx={{ mb: 3 }}
              variant="body1"
            >
              Thank you for considering me for potential opportunities. I am excited to connect with you and discuss how I can contribute to your team or project. Please feel free to get in touch to schedule an interview or to send me a job proposal.
            </Typography>
            <Typography
              color="primary"
              sx={{ mb: 3 }}
              variant="h6"
            >
              For immediate inquiries or urgent matters, please email me directly at gastongenaudar@gmail.com. For less urgent matters, please use the contact form below, and I will get back to you as soon as possible.
            </Typography>
            <Stack
              alignItems="center"
              direction="row"
              flexWrap="wrap"
              gap={4}
              sx={{
                color: 'text.primary',
                '& > *': {
                  flex: '0 0 auto'
                }
              }}
            >

            </Stack>
          </Container>
        </Box>
        <Box
          sx={{
            backgroundColor: 'background.paper',
            px: 6,
            py: 15
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              pr: {
                lg: 15
              }
            }}
          >
            <Typography
              sx={{ pb: 3 }}
              variant="h6"
            >
              Fill the form below
            </Typography>
            <ContactForm onSuccessfulSubmit={openModal} />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Page;