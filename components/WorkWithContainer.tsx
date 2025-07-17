"use client";

import { useEffect, useRef } from "react";
import workWithBg from "@/public/work_with_bg.jpg";
import { Earth } from "lucide-react";
import { Hotel } from "lucide-react";
import { FaMonument } from "react-icons/fa";
import { FaUmbrellaBeach } from "react-icons/fa";

export default function WorkWithContainer() {
  const items = [
    {
      id: 1,
      text: "країн",
      img: <Earth className="w-16 h-16 md:w-20 md:h-20" />,
      numbers: 29,
    },
    {
      id: 2,
      text: "розкішних пляжів",
      img: <FaUmbrellaBeach className="w-16 h-16 md:w-20 md:h-20" />,
      numbers: 2000,
    },
    {
      id: 3,
      text: "шикарних готелів",
      img: <Hotel className="w-16 h-16 md:w-20 md:h-20" />,
      numbers: 9000,
    },
    {
      id: 4,
      text: "визначних пам'яток",
      img: <FaMonument className="w-16 h-16 md:w-20 md:h-20" />,
      numbers: 7000,
    },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const offset = (scrollY - sectionTop) * 0.3; // Adjust parallax speed
      section.style.setProperty("--parallax-offset", `${offset}px`);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-8 min-h-[400px] md:min-h-[500px]"
      style={{
        backgroundImage: `url(${workWithBg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll",
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10 flex flex-col items-center justify-center text-white text-center min-h-[400px] md:min-h-[500px] px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16">
          З ким ми працюємо
        </h1>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center w-[120px] md:w-[150px]"
            >
              <div className="p-3 md:p-4 border-2 border-yellow-500 rounded-full mb-4">
                {item.img}
              </div>
              <div className="text-4xl md:text-6xl text-yellow-500 font-bold">
                {item.numbers}
              </div>
              <div className="text-lg md:text-2xl">{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
