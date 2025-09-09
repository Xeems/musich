'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const BUBBLE_COUNT = 20

export default function LavaLampBackground() {
    const bubblesRef = useRef<SVGCircleElement[]>([])

    useEffect(() => {
        const tl = gsap.timeline({ repeat: -1 })

        bubblesRef.current.forEach((bubble, i) => {
            const duration = gsap.utils.random(20, 30)
            const delay = gsap.utils.random(0, 5)
            const xMove = gsap.utils.random(-50, 50)
            const yMove = gsap.utils.random(-100, 100)

            tl.to(
                bubble,
                {
                    x: xMove,
                    y: yMove,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    duration,
                    repeatDelay: delay,
                },
                i * 0.1,
            )
        })

        return () => {
            tl.kill()
        }
    }, [])

    const setBubbleRef = (el: SVGCircleElement, i: number) => {
        if (el) bubblesRef.current[i] = el
    }

    // Генерируем случайные позиции и размеры пузырей
    const bubbles = Array.from({ length: BUBBLE_COUNT }).map((_, i) => ({
        cx: gsap.utils.random(10, 90) + '%',
        cy: gsap.utils.random(10, 90) + '%',
        r: gsap.utils.random(10, 12),
        fill: `rgba(255, ${gsap.utils.random(120, 180)}, 0, 0.6)`,
    }))

    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            <svg
                className="h-full w-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid slice">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation="5"
                            result="blur"
                        />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  
                                    0 1 0 0 0  
                                    0 0 1 0 0  
                                    0 0 0 20 -8"
                            result="cm"
                        />
                    </filter>
                </defs>

                <g filter="url(#goo)">
                    {bubbles.map((b, i) => (
                        <circle
                            key={i}
                            ref={(el) => setBubbleRef(el!, i)}
                            cx={b.cx}
                            cy={b.cy}
                            r={b.r}
                            fill={b.fill}
                        />
                    ))}
                </g>
            </svg>
        </div>
    )
}
