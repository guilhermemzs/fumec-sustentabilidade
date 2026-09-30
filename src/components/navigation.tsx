'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
const links = [
  ['/projeto', 'O projeto'],
  ['/sustentabilidade', 'Aprender'],
  ['/escolas', 'Nas escolas'],
  ['/impacto', 'Nossa trajetória'],
  ['/materiais', 'Materiais'],
] as const;
export function Navigation() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link
          href="/"
          className="brand"
          onClick={() => setOpen(false)}
          aria-label="Entre: universidade e escola — início"
        >
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>
            <strong>
              entre<span className="brand-dot">.</span>
            </strong>
            <small>universidade & escola</small>
          </span>
        </Link>
        <button
          className="menu-toggle"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="main-navigation"
          className={open ? 'main-nav open' : 'main-nav'}
          aria-label="Navegação principal"
        >
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={path === href ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link href="/contato" className="nav-contact" onClick={() => setOpen(false)}>
            Vamos conversar <ArrowUpRight size={16} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
