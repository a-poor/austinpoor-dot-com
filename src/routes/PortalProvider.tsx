import { type Signal } from '@builder.io/qwik';
import { createContextId } from '@builder.io/qwik';
 
export const PortalProviderContext = createContextId<Signal<boolean>>(
  'portal.is-open'
);
 
