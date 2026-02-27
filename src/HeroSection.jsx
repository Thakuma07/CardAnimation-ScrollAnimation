import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const HeroSection = () => {
    const containerRef = useRef(null);
    const line1Ref = useRef(null);
    const line2Ref = useRef(null);
    const line3Ref = useRef(null);
    const subRef = useRef(null);
    const ctaRef = useRef(null);
    const arrowRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.fromTo(
            line1Ref.current,
            { yPercent: 120, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1 }
        )
            .fromTo(
                line2Ref.current,
                { yPercent: 120, opacity: 0 },
                { yPercent: 0, opacity: 1, duration: 1 },
                "-=0.75"
            )
            .fromTo(
                line3Ref.current,
                { yPercent: 120, opacity: 0 },
                { yPercent: 0, opacity: 1, duration: 1 },
                "-=0.75"
            )
            .fromTo(
                subRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8 },
                "-=0.4"
            )
            .fromTo(
                ctaRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.7 },
                "-=0.4"
            );

        // Looping bounce on arrow
        gsap.to(arrowRef.current, {
            y: 10,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            duration: 0.9,
        });
    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#004d2c]"
        >
            {/* Subtle grid overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Glow blob */}
            <div
                className="absolute rounded-full pointer-events-none"
                style={{
                    width: "600px",
                    height: "600px",
                    background: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    filter: "blur(60px)",
                }}
            />

            {/* Main text block */}
            <div className="relative z-10 text-center px-6 select-none">
                {/* Label */}
                <div
                    ref={subRef}
                    className="inline-flex items-center gap-2 mb-8"
                    style={{ opacity: 0 }}
                >
                    <span className="h-px w-10 bg-emerald-400" />
                    <span
                        className="text-emerald-400 text-xs font-black tracking-[0.4em] uppercase"
                    >
                        The Collection
                    </span>
                    <span className="h-px w-10 bg-emerald-400" />
                </div>

                {/* Giant headline — clipped lines for smooth animation */}
                <div className="overflow-hidden leading-none mb-1">
                    <h1
                        ref={line1Ref}
                        className="text-white font-black uppercase"
                        style={{
                            fontSize: "clamp(3.5rem, 12vw, 10rem)",
                            lineHeight: 0.9,
                            letterSpacing: "-0.03em",
                            opacity: 0,
                        }}
                    >
                        Museum
                    </h1>
                </div>
                <div className="overflow-hidden leading-none mb-1">
                    <h1
                        ref={line2Ref}
                        className="font-black uppercase"
                        style={{
                            fontSize: "clamp(3.5rem, 12vw, 10rem)",
                            lineHeight: 0.9,
                            letterSpacing: "-0.03em",
                            color: "#10b981",
                            opacity: 0,
                        }}
                    >
                        of
                    </h1>
                </div>
                <div className="overflow-hidden leading-none mb-10">
                    <h1
                        ref={line3Ref}
                        className="text-white font-black uppercase"
                        style={{
                            fontSize: "clamp(3.5rem, 12vw, 10rem)",
                            lineHeight: 0.9,
                            letterSpacing: "-0.03em",
                            opacity: 0,
                        }}
                    >
                        Money
                    </h1>
                </div>

                {/* Description */}
                <p
                    className="text-white/50 text-base font-medium tracking-wide max-w-md mx-auto leading-relaxed"
                    style={{ opacity: 0 }}
                    ref={ctaRef}
                >
                    Rare financial artifacts from across history.
                    <br />
                    Scroll to explore the collection.
                </p>
            </div>

            {/* Scroll indicator */}
            <div
                ref={arrowRef}
                className="absolute bottom-10 left-1/2 z-10 flex flex-col items-center gap-2"
                style={{ transform: "translateX(-50%)" }}
            >
                <span className="text-white/30 text-[10px] font-bold tracking-[0.3em] uppercase">
                    Scroll
                </span>
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 3V17M10 17L4 11M10 17L16 11"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </div>
    );
};

export default HeroSection;
