import { motion, type HTMLMotionProps } from "framer-motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  x?: number;
  rotate?: number;
  scale?: number;
};

const Reveal = ({ delay = 0, y = 28, x = 0, rotate = 0, scale = 1, children, ...rest }: RevealProps) => (
  <motion.div
    initial={{ opacity: 0, y, x, rotate, scale }}
    whileInView={{ opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    {...rest}
  >
    {children}
  </motion.div>
);

export default Reveal;
