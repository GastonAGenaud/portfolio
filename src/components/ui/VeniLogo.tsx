import Image from 'next/image';

type Props = {
  className?: string;
};

/**
 * The Veni a Ver logo on its dark plate: the gold artwork needs a dark
 * background, whatever the theme. `className` sets the logo's height.
 */
const VeniLogo = ({ className = 'h-8' }: Props) => (
  <span className="inline-flex items-center rounded-xl bg-[#15150d] px-4 py-2.5">
    <Image
      src="/brand/veni-a-ver.svg"
      alt="Veni a Ver"
      width={360}
      height={100}
      unoptimized
      className={`w-auto ${className}`}
    />
  </span>
);

export default VeniLogo;
