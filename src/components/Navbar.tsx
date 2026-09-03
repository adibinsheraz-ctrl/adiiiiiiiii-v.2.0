export default function Navbar() {
  return (
      <nav className="fixed top-0 left-0 right-0 z-10 px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between">
        {/* Logo */}
        <a href="https://www.instagram.com/adibinsheraz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 shrink-0">
          <span
            className="text-[21px] sm:text-[26px] tracking-tight text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            adiiiiiiiii
          </span>
          <span
            className="text-[25px] sm:text-[30px] text-white select-none"
            style={{ letterSpacing: '-0.02em' }}
          >
            &#x2733;&#xFE0E;
          </span>
        </a>

        {/* Desktop CTA (hidden below md) */}
        <a
          href="https://www.instagram.com/adibinsheraz"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block text-[23px] text-white underline underline-offset-2 hover:opacity-60 transition-opacity"
        >
          Get in touch
        </a>

      </nav>
  );
}
