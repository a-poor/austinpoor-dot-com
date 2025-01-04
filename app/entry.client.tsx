import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: "https://f03fd02f0d0c93a039ebbb5e4a70c7c5@o1081370.ingest.us.sentry.io/4508586567794688",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: [
    'localhost',
    /^https:\/\/austinpoor\.com/,
  ],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
    {
      onCaughtError: (error, errorInfo) => {
        console.error('Caught error:', error, errorInfo);
        Sentry.captureException(error);
      },
      onUncaughtError: (error, errorInfo) => {
        console.error('Uncaught error:', error, errorInfo);
        Sentry.captureException(error);
      },
      onRecoverableError: (error, errorInfo) => {
        console.error('Recoverable error:', error, errorInfo);
        Sentry.captureException(error);
      },
    },
  );
});
