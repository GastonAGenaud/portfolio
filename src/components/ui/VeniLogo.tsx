type Props = {
  className?: string;
};

/** The veniaver.com wordmark, as the product site shows it in its header. */
const VeniLogo = ({ className = '' }: Props) => (
  <span
    className={`whitespace-nowrap font-bold leading-none tracking-tighter text-dark-1 ${className}`}
  >
    veniaver<span className="text-[#e8552d]">.</span>
    <span className="opacity-60">com</span>
  </span>
);

export default VeniLogo;
