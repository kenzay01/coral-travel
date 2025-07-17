"use client";

import Image from "next/image";
import leftImage from "@/public/map_left.jpg";
import midImage from "@/public/map_center.jpg";
import logoImg from "@/public/logo.png";
import { useState } from "react";
import Modal from "@/components/Modal";
export default function MapContainer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
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
            {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2539.9658351053095!2d30.6371590260985!3d50.46036088665067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z0JLRg9C7LiDQr9C60L7QstCwINCT0L3RltC30LTQvtCy0YHRjNC60L7Qs9C-IDFBLCDQvC4g0JvRltGB0L7QstCw!5e0!3m2!1suk!2sua!4v1752232150886!5m2!1suk!2sua"
              width="600"
              height="450"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe> */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2539.9658351053095!2d30.6371590260985!3d50.46036088665067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z0JLRg9C7LiDQr9C60L7QstCwINCT0L3RltC30LTQvtCy0YHRjNC60L7Qs9C-IDFBLCDQvC4g0JvRltGB0L7QstCw!5e0!3m2!1suk!2sua!4v1752232150886!5m2!1suk!2sua"
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
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-0">
            <div className="flex-1 flex items-center justify-center">
              <Image src={logoImg} alt="Logo" className="h-22 w-auto" />
            </div>
            <div className="flex-1 text-white flex flex-col items-center md:items-end ">
              <div className="md:text-lg md:text-end text-center">
                м. Київ, вул. Якова Гніздовського 1A, м. Лісова
              </div>
              <div className="text-xl">+38 (044) 499-99-39</div>
              <button
                className="text-yellow-400 border-b-2 border-dashed font-medium text-lg transition-colors"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                Замовити дзвінок
              </button>
            </div>
          </div>
        </div>
      </section>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
