'use client';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
export const Seo = (props) => {
  const { title } = props;

  const fullTitle = title
    ? title + ' | Devias Kit PRO'
    : 'Devias Kit PRO';

  return (
    <Head>
      <title>
        {fullTitle}
      </title>
    </Head>
  );
};

Seo.propTypes = {
  title: PropTypes.string
};
