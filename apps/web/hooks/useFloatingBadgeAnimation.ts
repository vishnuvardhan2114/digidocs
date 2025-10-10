import { useEffect } from 'react'
import gsap from 'gsap'

const ANIMATION_CONFIG = {
  fadeIn: {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' },
    delayBase: 0.3,
    delayIncrement: 0.15,
  },
  float: {
    yOffset: 8,
    durationBase: 3,
    durationIncrement: 0.9,
    delayIncrement: 0.2,
  },
} as const

export const useFloatingBadgeAnimation = (badgeRefs: React.RefObject<HTMLDivElement | null>[]) => {
  useEffect(() => {
    badgeRefs.forEach((ref, index) => {
      const element = ref.current
      if (!element) return

      // Fade in animation
      gsap.fromTo(
        element,
        ANIMATION_CONFIG.fadeIn.initial,
        {
          ...ANIMATION_CONFIG.fadeIn.animate,
          delay: ANIMATION_CONFIG.fadeIn.delayBase + index * ANIMATION_CONFIG.fadeIn.delayIncrement,
        }
      )

      // Floating animation
      gsap.to(element, {
        y: `+=${ANIMATION_CONFIG.float.yOffset}`,
        duration: ANIMATION_CONFIG.float.durationBase + index * ANIMATION_CONFIG.float.durationIncrement,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: index * ANIMATION_CONFIG.float.delayIncrement,
      })
    })
  }, [badgeRefs])
}

