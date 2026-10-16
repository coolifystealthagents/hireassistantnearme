'use client';

import { useEffect, useRef, useState } from 'react';

export function HeaderClient({ brand }: { brand: string }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const nav = navRef.current;
    const focusable = [...(nav?.querySelectorAll<HTMLElement>('a,button') ?? [])];
    focusable[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return <>
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <header className="nav">
      <div className="nav-inner">
        <a className="logo" href="/" aria-label={`${brand} home`}><span className="logo-mark-wrap"><img className="logo-img" src="/logo.svg?v=20261016" alt="" width="43" height="43" /><span className="logo-name">{brand}</span></span></a>
        <a className="header-parent-brand" href="https://stealthagents.com/" aria-label="Powered by StealthAgents"><span>Powered by StealthAgents</span><img src="/images/stealth-agents-logo-black.png" alt="" width="149" height="50" /></a>
        <button ref={buttonRef} className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen((value) => !value)}><span aria-hidden="true">{open ? 'Close' : 'Menu'}</span><span className="sa-sr-only">Toggle navigation</span></button>
        <nav ref={navRef} id="primary-navigation" className={`links fleet-nav${open ? ' is-open' : ''}`} aria-label="Main navigation">
          <a href="/" onClick={() => setOpen(false)}>Home</a>
          <a href="/services" onClick={() => setOpen(false)}>Services</a>
          <a href="/contact-us" id="cta-global-header-contact" onClick={() => setOpen(false)}>Contact Us</a>
        </nav>
      </div>
    </header>
    <span id="main-content" tabIndex={-1} className="main-focus-target"><span className="sa-sr-only">Page content begins</span></span>
  </>;
}
