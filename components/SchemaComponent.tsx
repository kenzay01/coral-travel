"use client";
import Image from "next/image";
import schemaImgBg from "@/public/schema.jpg";
import { Plane } from "lucide-react";

export default function SchemaComponent() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Фонове зображення */}
      <div className="absolute inset-0">
        <Image
          src={schemaImgBg}
          alt="Готель у вечірньому освітленні"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Контент */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Заголовок */}
        <h2 className="text-white text-4xl font-bold text-center mb-20">
          {"Схема роботи"}
        </h2>

        {/* Схема кроків */}
        <div className="relative max-w-3xl mx-auto flex flex-col gap-4 md:gap-8">
          <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-start items-center h-full">
            <div className="p-4 bg-white/70 backdrop-blur-md rounded-full shadow-lg flex justify-center items-center flex-col h-48 w-48">
              <h1 className="text-4xl">1</h1>
              <p className="text-sm text-center">
                {"Залишаєте заявку або телефонуйте"}
              </p>
            </div>
            <div className="w-48 border-2 border-dashed border-white hidden md:block"></div>
            <div className="p-4 bg-white/70 backdrop-blur-md rounded-full shadow-lg flex justify-center items-center flex-col h-48 w-48">
              <h1 className="text-4xl">2</h1>
              <p className="text-sm text-center">
                {
                  "Зв'язуємося з Вами, підбираємо тур або до Вас виїжджає менеджер"
                }
              </p>
            </div>
          </div>
          <div className="w-32 border-2 border-dashed border-white self-center -rotate-45 hidden md:block"></div>
          <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-end items-center h-full relative">
            <div className="p-4 bg-white/70 backdrop-blur-md rounded-full shadow-lg flex justify-center items-center flex-col h-48 w-48">
              <h1 className="text-4xl">3</h1>
              <p className="text-sm text-center">
                {"Готуємо документи / доставляємо Вам"}
              </p>
            </div>
            <div className="w-48 border-2 border-dashed border-white hidden md:block"></div>
            <div className="p-4 bg-white/70 backdrop-blur-md rounded-full shadow-lg flex justify-center items-center flex-col h-48 w-48">
              <h1 className="text-4xl">4</h1>
              <p className="text-sm text-center">
                {"Ви насолоджуєтеся відпусткою"}
              </p>
            </div>
            <div className="absolute -right-24 top-0 w-32 border-2 border-dashed border-white self-center -rotate-45 hidden md:block"></div>
            <Plane className="w-12 h-12 text-white absolute -right-28 -top-20 hidden md:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
