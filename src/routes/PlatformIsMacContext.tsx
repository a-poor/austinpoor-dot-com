import { type Signal } from '@builder.io/qwik';
import { createContextId } from '@builder.io/qwik';
 
export const PlatformIsMacContext = createContextId<Signal<boolean>>(
  'platform.is-mac'
);
 
