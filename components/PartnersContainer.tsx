"use client";

import partner1 from "@/public/partners/partner1.png";
import partner2 from "@/public/partners/partner2.png";
import partner3 from "@/public/partners/partner3.png";
import partner4 from "@/public/partners/partner4.png";
import partner5 from "@/public/partners/partner5.png";
import partner6 from "@/public/partners/partner6.png";
import partner7 from "@/public/partners/partner7.png";
import partner8 from "@/public/partners/partner8.png";
import mainPartner1 from "@/public/partners/main_partner_1.png";
import mainPartner2 from "@/public/partners/main_partner_2.png";
import mainPartner3 from "@/public/partners/main_partner_3.png";
import mainPartner4 from "@/public/partners/main_partner_4.png";

import Image from "next/image";

export default function PartnersContainer() {
  const mainPartners = [
    {
      id: 1,
      name: "Main Partner",
      image: mainPartner1,
      text: "Асоціація лідер турбізнесу України",
    },
    {
      id: 2,
      name: "Main Partner",
      image: mainPartner2,
      text: "Міжнародна асоціація повітряного транспорту",
    },
    {
      id: 3,
      name: "Main Partner",
      image: mainPartner3,
      text: "Асоціація лідер турбізнесу України",
    },
    {
      id: 4,
      name: "Main Partner",
      image: mainPartner4,
      text: "Туроператор року 2016",
    },
  ];
  const partners = [
    {
      id: 1,
      name: "Partner 1",
      image: partner1,
      width: "w-22",
    },
    {
      id: 2,
      name: "Partner 2",
      image: partner2,
      width: "w-22",
    },
    {
      id: 3,
      name: "Partner 3",
      image: partner3,
      width: "w-20",
    },
    {
      id: 4,
      name: "Partner 4",
      image: partner4,
      width: "w-16",
    },
    {
      id: 5,
      name: "Partner 5",
      image: partner5,
      width: "w-22",
    },
    {
      id: 6,
      name: "Partner 6",
      image: partner6,
      width: "w-22",
    },
    {
      id: 7,
      name: "Partner 7",
      image: partner7,
      width: "w-14",
    },
    {
      id: 8,
      name: "Partner 8",
      image: partner8,
      width: "w-24",
    },
  ];

  return (
    <section className="bg-white flex items-center justify-center pt-12 pb-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl text-center mb-12">Наші надійні партнери</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-4">
          {mainPartners.map((partner) => (
            <div
              key={partner.id}
              className="flex flex-col gap-2 items-center mb-8"
            >
              <Image
                src={partner.image}
                alt={partner.name}
                className="h-auto w-24 md:w-32"
              />
              <p className="text-center text-sm md:text-md">{partner.text}</p>
            </div>
          ))}
        </div>

        {/* Десктопна версія - залишається без змін */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-8 gap-4 items-center">
          {partners.map((partner) => (
            <div
              className="flex flex-col items-center gap-2 mb-8 grayscale hover:grayscale-0 transition-all duration-500"
              key={partner.id}
            >
              <Image
                src={partner.image}
                alt={partner.name}
                className={`h-auto ${partner.width}`}
              />
            </div>
          ))}
        </div>

        {/* Мобільна версія з особливою логікою для 5-го елемента */}
        <div className="md:hidden">
          {/* Перші 4 елементи в сітці 2x2 */}
          <div className="grid grid-cols-3 gap-4 items-center mb-8">
            {partners.slice(0, 6).map((partner) => (
              <div
                className="flex flex-col items-center gap-2 grayscale hover:grayscale-0 transition-all duration-500"
                key={partner.id}
              >
                <Image
                  src={partner.image}
                  alt={partner.name}
                  className={`h-auto ${partner.width}`}
                />
              </div>
            ))}
          </div>

          {/* 5-й елемент окремо по центру */}
          <div className="flex justify-center">
            <div className="flex flex-row items-center gap-4 mb-8">
              <Image
                src={partners[6].image}
                alt={partners[6].name}
                className={`h-auto ${partners[6].width} grayscale hover:grayscale-0 transition-all duration-500`}
              />
              <Image
                src={partners[7].image}
                alt={partners[7].name}
                className={`h-auto ${partners[7].width} grayscale hover:grayscale-0 transition-all duration-500`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
