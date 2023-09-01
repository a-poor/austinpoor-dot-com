'use client';
import { ReactNode } from 'react';
import { MotionConfig } from "framer-motion"

export default function ProviderWrap({ children }: { children: ReactNode }) {
  return (
    <>
      <MotionConfig reducedMotion="user">
        { children }
      </MotionConfig>
    </>
  );
}
