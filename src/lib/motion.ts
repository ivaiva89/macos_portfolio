export const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const hasFinePointer = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

/** Hover-driven effects should only run on devices that can hover and want motion. */
export const allowsHoverMotion = () => hasFinePointer() && !prefersReducedMotion()
