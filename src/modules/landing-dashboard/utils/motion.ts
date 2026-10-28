export const easeOut = [0.22, 1, 0.36, 1] as const;
export const easeMove = [0.25, 1, 0.5, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: easeOut } }
};

export const stagger = (delayChildren = 0, staggerChildren = 0.06) => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } }
});