/**
 * TODO: Update this component to use your client-side framework's link
 * component. We've provided examples of how to do this for Next.js, Remix, and
 * Inertia.js in the Catalyst documentation:
 *
 * https://catalyst.tailwindui.com/docs#client-side-router-integration
 */

import * as Headless from '@headlessui/react'
import React, { forwardRef } from 'react'
import { Link as RRLink, type LinkProps } from 'react-router'

export const Link = forwardRef(function Link(
  props: { href: string | LinkProps['to'] } & Omit<LinkProps, 'to'>,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  return (
    <Headless.DataInteractive>
      <RRLink {...props} to={props.href} ref={ref} />
    </Headless.DataInteractive>
  )
})
