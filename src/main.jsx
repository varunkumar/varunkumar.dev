import ReactDOM from 'react-dom/client';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => reg.update().catch(() => {}))
      .catch(() => {
        // SW registration failed — site still works normally
      });
  });

  // An iOS Home Screen PWA is resumed from a suspended WKWebView rather than
  // re-navigated, so the load-time registration above never reruns and an
  // old worker can stay in control indefinitely. Force an update check
  // whenever the app is foregrounded again or restored from bfcache.
  const recheckForUpdate = () => {
    navigator.serviceWorker
      .getRegistration('/sw.js')
      .then((reg) => reg?.update().catch(() => {}));
  };
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') recheckForUpdate();
  });
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) recheckForUpdate();
  });

  let reloaded = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (reloaded) return;
    reloaded = true;
    window.location.reload();
  });
}
