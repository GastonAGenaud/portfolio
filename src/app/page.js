"use client"
import React from 'react';
import HeroSection from "./components/HeroSection"
import Navbar from "./components/Navbar"
import { GridList1 } from "./components/grid-list-1"
import { Box, Container, Stack } from '@mui/material';
import { Previewer } from "./components/previewer";
const components = [
  {
    element: <GridList1 />,
    title: 'Grid list 1'
  }]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
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

