"use client";

import Image from "next/image";
import leftImage from "@/public/map_left.jpg";
import midImage from "@/public/map_center.jpg";
import logoImg from "@/public/logo.png";

export default function MapContainer() {
  return (
    <section className="flex flex-col">
      <div
        className="flex flex-col md:flex-row md:h-[300px] bg-white"
        id="destinations"
      >
        {/* Зображення - тільки на десктопі */}
        <div className="md:flex-1 relative h-[300px] md:h-auto">
          <Image
            src={leftImage}
            alt="Coral Tour Office"
            fill
            className="object-cover"
          />
        </div>

        <div className="md:flex-1 relative h-[300px] md:h-auto">
          <Image
            src={midImage}
            alt="Coral Tour Office"
            fill
            className="object-cover"
          />
        </div>
        {/* Карта з фіксованою висотою */}
        <div className="md:flex-1 relative h-[300px] md:h-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10184.873116682245!2d30.5456!3d50.343834!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4c7b2bfe388c9%3A0x44648bd073e99bd7!2sArt%20Mall!5e0!3m2!1sen!2sus!4v1751284889708!5m2!1sen!2sus"
            // width="600"
            // height="300"
            className="w-full h-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className="bg-cyan-500 p-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-baseline">
          <div className="flex-1">
            <Image src={logoImg} alt="Logo" className="h-22 md:h-0 w-auto" />
          </div>
          <div className="flex-1 text-white flex flex-col items-center md:items-end ">
            <div className="text-lg text-end">
              м. Київ, вул. Заболотного, 37 <br /> ТРЦ ART MALL, 2 поверх
            </div>
            <div className="text-xl">+38 (044) 499-99-39</div>
            <button
              className="text-yellow-400 border-b-2 border-dashed font-medium text-lg transition-colors"
              onClick={() => {
                //   setIsModalOpen(true);
              }}
            >
              Замовити дзвінок
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
