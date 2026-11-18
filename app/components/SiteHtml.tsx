import {useEffect, useRef} from 'react';
import {useNavigate} from 'react-router';

/**
 * Renders a page's markup from the IVAARO static site and runs its script.
 * Internal links navigate inside the app instead of reloading the page.
 */
export function SiteHtml({
  html,
  init,
}: {
  html: string;
  /** Runs after the markup is in the page; returns a cleanup function */
  init?: (root: HTMLElement) => void | (() => void);
}) {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const root = ref.current;
    if (!root || !init) return;
    return init(root) || undefined;
  }, [html, init]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      ref={ref}
      className="site-html"
      style={{display: 'contents'}}
      onClick={(e) => {
        if (e.defaultPrevented || e.button !== 0) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const a = (e.target as HTMLElement).closest('a');
        if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
        const href = a.getAttribute('href');
        if (!href || !href.startsWith('/') || href.startsWith('//')) return;
        if (href.startsWith('/assets/')) return;
        e.preventDefault();
        void navigate(href);
      }}
      dangerouslySetInnerHTML={{__html: html}}
    />
  );
}
