import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Athletic Transformation · Gaston Genaud',
  description:
    'A data-driven body recomposition journey — weight, body composition, measurements, bloodwork and nutrition, tracked measurement by measurement.',
};

export default function FitnessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="greek-theme min-h-screen w-full">{children}</div>;
}
