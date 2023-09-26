import React from 'react';
import { format, subHours, subMinutes, subSeconds } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  CardMedia,
  Chip,
  Link,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';

const now = new Date();

const posts = [
  {
    id: '24b76cac9a128cd949747080',
    author: {
      avatar: '/images/github.png',
      name: 'GastonAGenaud/appium-selenium-python'
    },
    category: 'Automation Testing',
    cover: '/images/appium.png',
    publishedAt: subMinutes(subSeconds(now, 16), 45).getTime(),
    readTime: '5 min',
    shortDescription: 'Appium and Python are a great combination of Mobile automation. Python existing as an Interpreted, high-level programming language proposes a quicker development time. Appium is an open-source tool you can utilize to automate mobile web, mobile native, and mobile hybrid applications on iOS and Android outlets.',
    title: 'Mobile Automation Testing with Appium, Selenium, and Python',
    redirect: 'https://github.com/GastonAGenaud/appium-python-automation'
  },
  {
    id: 'a9c19d0caf2ca91020aacd1f',
    author: {
      avatar: '/images/github.png',
      name: 'GastonAGenaud/cypress-cucumber'
    },
    category: 'Automation Testing',
    cover: '/images/nodejs.png',
    publishedAt: subHours(subMinutes(subSeconds(now, 29), 51), 6).getTime(),
    readTime: '6 min',
    shortDescription: '',
    title: 'Automation Project with Cypress and Cucumber',
    redirect: 'https://www.google.com'
  },
  {
    id: '44df90cbf89963b8aa625c7d',
    author: {
      avatar: '/images/github.png',
      name: 'GastonAGenaud/portfolio'
    },
    category: 'Nextjs',
    cover: '/images/nextjs.png',
    publishedAt: subHours(subMinutes(subSeconds(now, 6), 46), 16).getTime(),
    readTime: '3 min',
    shortDescription: 'This web page.',
    title: 'Nextjs Project with TypeScript, Next, Material-UI, TailwindCSS',
    redirect: 'https://www.google.com'
  }
];

export const GridList1 = () => (
  <Box
    sx={{
      backgroundColor:
        '#191919',
        p: 4,
        m: 0, // Asegurándote de que no haya margen.
        border: 0, // Asegurándote de que no haya borde.
    }}
  >
    <Grid
      container
      spacing={3}
    >
      {posts.map((post) => (
        <Grid
          key={post.id}
          xs={12}
          md={4}
        >
          <Card
            sx={{
              height: '100%',
              p: 2
            }}
          >
            <Box
              sx={{
                pt: 'calc(100% * 4 / 4)',
                position: 'relative'
              }}
            >
              <CardMedia
                image={post.cover}
                sx={{
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  width: '100%'
                }}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <div>
                <Chip
                  label={post.category}
                  variant="outlined"
                />
              </div>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  my: 2
                }}
              >
                <Avatar src={post.author.avatar} />
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle2">
                    {post.author.name}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    variant="caption"
                  >
                    {`${format(post.publishedAt, 'dd MMM')} · ${post.readTime} read`}
                  </Typography>
                </Box>
              </Box>
              <Link
                color="text.primary"
                variant="h6"
                href={post.redirect}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
              >
                {post.title}
              </Link>
              <Typography
                color="text.secondary"
                sx={{
                  height: 72,
                  mt: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2
                }}
                variant="body1"
              >
                {post.shortDescription}
              </Typography>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);
