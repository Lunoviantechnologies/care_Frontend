import { useEffect } from 'react';

/**
 * Drop this component once anywhere inside your app tree —
 * e.g. in your root layout or App.jsx.
 *
 * It fires after React's first real paint and removes the
 * HTML splash screen from index.html.
 */
export default function SplashDismisser() {
  useEffect(() => {
    // useEffect runs after the first paint — safe to dismiss now
    window.dismissSplash?.();
  }, []);

  return null;
}
