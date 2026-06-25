import * as React from "react"
import { motion, useInView } from "framer-motion"

const cn = (...classes) => classes.filter(Boolean).join(' ');

export function BlurReveal({
  className,
  children,
  delay = 0,
  duration = 1,
  trigger = true,
}) {
  const spanRef = React.useRef(null)
  const isInView = useInView(spanRef, { once: true })

  const shouldAnimate = isInView && trigger;

  return (
    <motion.span
      ref={spanRef}
      initial={{ opacity: 0, filter: "blur(10px)", y: "20%" }}
      animate={shouldAnimate ? { opacity: 1, filter: "blur(0px)", y: "0%" } : { opacity: 0, filter: "blur(10px)", y: "20%" }}
      transition={{ duration: duration, delay: delay }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.span>
  )
}
