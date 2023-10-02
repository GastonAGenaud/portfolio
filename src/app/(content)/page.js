"use client"
import React from 'react';
import HeroSection from '@/components/HeroSection/HeroSection';
import Navbar from '@/components/Navbar/Navbar';
import { GridList1 } from '@/components/Shared/GridList/grid-list-1';
import { Box, Container, Stack } from '@mui/material';
import { Previewer } from '@/components/Shared/Previewer/previewer';
import { HomeFeatures } from '@/components/Features/Features';
import Head from 'next/head';
const components = [
  {
    element: <GridList1 />,
    title: 'Grid list 1'
  }]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Head>
      <link rel="icon" href="favicon.ico" sizes="any" />
      </Head>
      <Navbar />
      <div className="container mx-auto px-12 py-4">
        <HeroSection />
      </div>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <HomeFeatures />
        <Container maxWidth="lg">
          <Stack spacing={8}>
            {components.map((component) => (
              <Previewer
                key={component.title}

              >
                {component.element}
              </Previewer>
            ))}
          </Stack>
        </Container>
      </Box>
    </main>
  )
}

