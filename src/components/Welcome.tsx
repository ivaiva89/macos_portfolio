import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const FONT_WEIGHTS = {
    subtitle: { min: 100, max: 400, default: 100 },
    title: { min: 400, max: 900, default: 400 },
}

const renderText = (text: string, className: string, baseWeight = 400) => {
    return [...text].map((char, index) => (
        <span key={index} className={className} style={{ fontVariationSettings: `'wght' ${baseWeight}` }}>
            {char === ' ' ? '\u00A0' : char}
        </span>
    ))
}

const setupTextHover = (container: HTMLElement | null, type: keyof typeof FONT_WEIGHTS, onTween: (target: Element, tween: gsap.core.Tween) => void) => {
    if (!container) return () => {}

    const letters = container.querySelectorAll('span')
    const { min, max, default: base } = FONT_WEIGHTS[type]

    let cachedContainerLeft = 0
    const cachedLetterCenters: number[] = []

    const computeLetterCenters = () => {
        const { left } = container.getBoundingClientRect()
        cachedContainerLeft = left
        cachedLetterCenters.length = 0
        letters.forEach((letter) => {
            const { left: l, width: w } = letter.getBoundingClientRect()
            cachedLetterCenters.push(l - left + w / 2)
        })
    }

    const animateLetter = (letter: HTMLElement, weight: number, duration = 0.25) => {
        gsap.killTweensOf(letter)
        const tween = gsap.to(letter, {
            duration,
            ease: 'power2.out',
            fontVariationSettings: `'wght' ${weight}`,
        })
        onTween(letter, tween)
        return tween
    }

    const handleMouseMove = (e: MouseEvent) => {
        const mouseX = e.clientX - cachedContainerLeft
        letters.forEach((letter, index) => {
            const letterCenterX = cachedLetterCenters[index]
            const distance = Math.abs(mouseX - letterCenterX)
            const intensity = Math.exp(-(distance ** 2) / 2000)

            animateLetter(letter, min + (max - min) * intensity)
        })
    }
    const handleMouseLeave = () => {
        letters.forEach((letter) => {
            animateLetter(letter, base, 0.3)
        })
    }

    computeLetterCenters()
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', computeLetterCenters)
    return () => {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseleave', handleMouseLeave)
        window.removeEventListener('resize', computeLetterCenters)
    }
}

const Welcome = () => {
    const titleRef = useRef(null)
    const subtitleRef = useRef(null)
    const activeTweensRef = useRef<Map<Element, gsap.core.Tween>>(new Map())

    useGSAP(() => {
        const trackTween = (target: Element, tween: gsap.core.Tween) => {
            activeTweensRef.current.set(target, tween)
            tween.eventCallback('onComplete', () => {
                if (activeTweensRef.current.get(target) === tween) {
                    activeTweensRef.current.delete(target)
                }
            })
        }

        const titleCleanup = setupTextHover(titleRef.current, 'title', trackTween)
        const subTitleCleanup = setupTextHover(subtitleRef.current, 'subtitle', trackTween)

        return () => {
            titleCleanup()
            subTitleCleanup()
            activeTweensRef.current.forEach((tween) => {
                tween.kill()
            })
            activeTweensRef.current.clear()
        }
    }, [])

    return (
        <section id="welcome">
            <p ref={subtitleRef}>{renderText("Hey, I'm Iva Welcome to my", 'text-3xl font-georama', 100)} </p>
            <h1 ref={titleRef} className="mt-7">
                {renderText('Portfolio', 'text-9xl italic font-georama')}
            </h1>

            <div className="small-screen">
                <p>This Portfolio is designed for desktop/tablet screens</p>
            </div>
        </section>
    )
}
export default Welcome
