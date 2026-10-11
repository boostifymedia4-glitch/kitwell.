import { forwardRef } from 'react';
import { Link as RouterLink, NavLink as RouterNavLink, type LinkProps, type NavLinkProps } from 'react-router-dom';
import { useI18n } from '.';
import { withLang } from './routing';

const isInternal = (to: unknown): to is string => typeof to === 'string' && to.startsWith('/') && !to.startsWith('//');

/** A router link that keeps the visitor in the current language: "/tools" becomes "/ur/tools" on the Urdu site. */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link({ to, ...rest }, ref) {
  const { lang } = useI18n();
  return <RouterLink ref={ref} to={isInternal(to) ? withLang(to, lang.code) : to} {...rest} />;
});

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLink({ to, ...rest }, ref) {
  const { lang } = useI18n();
  return <RouterNavLink ref={ref} to={isInternal(to) ? withLang(to, lang.code) : to} {...rest} />;
});
