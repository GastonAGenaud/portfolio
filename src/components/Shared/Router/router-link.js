/* eslint-disable react/display-name */
import { forwardRef } from 'react';
import Link from 'next/link';

/**
 * This is a wrapper over `next/link` component.
 * We use this to help us maintain consistency between CRA and Next.js
 */
export const RouterLink = forwardRef((props, ref) => (
  // eslint-disable-next-line react/react-in-jsx-scope
  <Link
    ref={ref}
    {...props} />
));
