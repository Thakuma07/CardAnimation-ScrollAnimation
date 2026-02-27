import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    color: "bg-red-500",
    image: "/card_burning_note.png",
    title: "The Burning Note",
    artist: "Viktor Ashford",
    year: "1923",
    edition: "1 of 1",
    value: "$4,200,000",
    tag: "HYPERINFLATION",
  },
  {
    color: "bg-blue-500",
    image: "/card_ocean_reserve.png",
    title: "Ocean Reserve",
    artist: "M. Delacroix",
    year: "1971",
    edition: "7 of 50",
    value: "$890,000",
    tag: "BRETTON WOODS",
  },
  {
    color: "bg-yellow-500",
    image: "/card_gold_standard.png",
    title: "Gold Standard",
    artist: "House of Midas",
    year: "1944",
    edition: "3 of 9",
    value: "$3,100,000",
    tag: "COMMODITY",
  },
  {
    color: "bg-purple-500",
    image: "/card_invisible_hand.png",
    title: "The Invisible Hand",
    artist: "Adam S. Collective",
    year: "1776",
    edition: "12 of 12",
    value: "$7,750,000",
    tag: "ECONOMICS",
  },
  {
    color: "bg-orange-500",
    image: "/card_crash_29.png",
    title: "Crash of '29",
    artist: "Wall St. Archives",
    year: "1929",
    edition: "2 of 6",
    value: "$1,500,000",
    tag: "BLACK TUESDAY",
  },
  {
    color: "bg-emerald-500",
    image: "/card_green_futures.png",
    title: "Green Futures",
    artist: "Eco Vault",
    year: "2023",
    edition: "001 of 100",
    value: "$450,000",
    tag: "SUSTAINABLE",
  },
  {
    color: "bg-rose-500",
    image: "/card_diamond_ledger.png",
    title: "Diamond Ledger",
    artist: "De Beers Est.",
    year: "1888",
    edition: "1 of 3",
    value: "$9,999,999",
    tag: "ULTRA RARE",
  },
];

const MuseumSection = () => {
  const scrollRef = useRef(null);
  const triggerRef = useRef(null);
  const revealTextRef = useRef(null);

  useGSAP(() => {
    // 1. THE MAIN HORIZONTAL MOVE
    const mainTrack = gsap.to(scrollRef.current, {
      x: "-350vw",
      ease: "none",
      force3D: true,
      scrollTrigger: {
        trigger: triggerRef.current,
        pin: true,
        scrub: 0.5,
        start: "top top",
        end: "+=5000",
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
      }
    });

    // 2. RANDOM INDEPENDENT MOVEMENT FOR EACH BOX
    const boxes = gsap.utils.toArray(".museum-box");

    boxes.forEach((box) => {
      const randomRotation = gsap.utils.random(-35, 35);
      const randomY = gsap.utils.random(-50, 50);
      const randomXOffset = gsap.utils.random(-100, 100);

      gsap.to(box, {
        rotation: randomRotation,
        y: randomY,
        x: randomXOffset,
        ease: "power1.inOut",
        force3D: true,
        scrollTrigger: {
          trigger: box,
          containerAnimation: mainTrack,
          start: "left right",
          end: "right left",
          scrub: 0.5,
        },
      });
    });

    // 3. TEXT FADE-IN LOGIC (Synced with horizontal animation)
    gsap.fromTo(
      revealTextRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: scrollRef.current,
          containerAnimation: mainTrack,
          start: "60% center",
          end: "90% center",
          scrub: 0.5,
        }
      }
    );

  }, { scope: triggerRef });

  return (
    <div ref={triggerRef} className="relative h-screen w-full overflow-hidden bg-[#004d2c]">
      {/* REVEAL TEXT (Behind the cards) */}
      <div ref={revealTextRef} className="absolute inset-0 flex flex-col items-center justify-center z-0">
        <h2 className="text-[12vw] font-black text-[#10b981] leading-none text-center uppercase italic">
          Museum<br />Of Money
        </h2>
        <div className="mt-10 px-6 py-3 border border-[#10b981] rounded-xl text-white uppercase text-lg font-bold tracking-widest cursor-pointer hover:bg-white hover:text-[#10b981] transition-all">
          View All Cards
        </div>
      </div>

      {/* THE FLOATING TRACK (Cards) */}
      <div
        ref={scrollRef}
        className="relative z-10 flex h-full items-center pointer-events-none"
        style={{
          width: "450vw",
          paddingLeft: "100vw",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className={`museum-box ${card.color} w-80 mx-10 shrink-0 rounded-xl border-10 border-white flex flex-col overflow-hidden`}
            style={{
              zIndex: 10 + index,
              height: "32rem",
              willChange: "transform",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
              boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
            }}
          >
            {/* BIG IMAGE */}
            <div className="relative w-full" style={{ height: "65%" }}>
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
                draggable={false}
              />
              {/* Tag pill floating over image — no backdrop-blur (perf) */}
              <span className="absolute top-3 left-3 text-[10px] font-black tracking-[0.2em] uppercase bg-black/60 text-white px-3 py-1 rounded-full">
                {card.tag}
              </span>
              <span className="absolute top-3 right-3 text-[11px] font-bold text-white/90 bg-black/50 px-2 py-1 rounded-md tracking-widest">
                {card.year}
              </span>
            </div>

            {/* BOTTOM INFO SECTION */}
            <div className="flex flex-col justify-between flex-1 px-5 py-4">
              <div>
                <h3 className="text-white font-black text-lg leading-tight tracking-tight">
                  {card.title}
                </h3>
                <p className="text-white/60 text-[11px] font-semibold tracking-widest uppercase mt-0.5">
                  {card.artist}
                </p>
              </div>

              {/* Edition + Value strip */}
              <div className="flex items-center justify-between bg-black/20 rounded-lg px-3 py-2.5 border border-white/20 mt-3">
                <div>
                  <p className="text-[8px] text-white/50 uppercase tracking-widest font-bold">Edition</p>
                  <p className="text-white font-black text-sm">{card.edition}</p>
                </div>
                <div className="w-px h-6 bg-white/20" />
                <div className="text-right">
                  <p className="text-[8px] text-white/50 uppercase tracking-widest font-bold">Est. Value</p>
                  <p className="text-white font-black text-sm">{card.value}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MuseumSection;