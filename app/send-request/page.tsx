"use client";
import Image from "next/image";
import { useState } from "react";
import homeBanner from "@/public/mainBanner.jpg";
import logo from "@/public/logo.png";
import Link from "next/link";
import sign from "@/public/sign.png"; // Adjust the path as necessary
import Modal from "@/components/Modal";

export default function SendRequestPage() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const options = [
    "Додаткові екскурсії від 550 грн",
    "Обід в літаку від 350 грн",
    "Перші місця в літаку від 350 грн",
    "Бізнес зал в аеропорту від 500 грн",
    "Тел карту GSM від 100 грн",
    "Страховку від 100 грн",
    "Смс попередження про перенесення рейсу або скасування рейсу 20 грн",
  ];

  const handleToggle = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = () => {
    if (selectedOptions.length === 0) {
      alert("Оберіть хоча б одну опцію для замовлення.");
      return;
    }

    console.log("Замовлено додатково:", selectedOptions);
    alert("Ваші побажання збережено!");
  };

  return (
    <>
      <div className="flex flex-col relative">
        <div className="fixed hidden xl:flex left-10 top-10 bg-white rounded-full items-center justify-center h-32 w-32 z-20">
          <Image
            src={sign}
            alt="Sign"
            className="object-contain w-full h-full"
          />
        </div>
        <section className="min-h-screen relative flex items-center justify-center text-white text-center px-4">
          {/* Background */}
          <div className="absolute inset-0">
            <Image
              src={homeBanner}
              alt="Ancient ruins background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Main content */}
          <div className="relative z-10 max-w-2xl w-full">
            {/* Logo */}
            <Link className="mb-4" href={`/`}>
              <Image src={logo} alt="Logo" width={250} className="mx-auto" />
            </Link>

            {/* Thank you message */}
            <h1 className="text-2xl md:text-4xl font-bold mb-2">
              Дякуємо за вашу заявку,
            </h1>
            <p className="text-lg md:text-2xl mb-6">
              наш менеджер зв`яжеться з Вами найближчим часом
            </p>

            {/* Options Block */}
            <div className="bg-red-600 text-white px-4 md:px-2 py-1 font-bold animate-pulse text-4xl mb-4">
              Ви додатково можете замовити:
            </div>

            <div className="border border-yellow-500 p-4 bg-black/40 mb-6 text-left space-y-3 mx-4">
              {options.map((option, index) => (
                <label key={index} className="block">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleToggle(option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}

              <p className="text-yellow-300 text-sm mt-4 italic">
                *Відзначте пункти і натисніть на кнопку замовити
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="bg-yellow-400 hover:bg-yellow-500 text-black text-lg font-bold py-3 px-6 w-full max-w-xs mx-auto block rounded"
            >
              Замовити
            </button>
          </div>
        </section>
        <div className="relative h-[300px]">
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
        <div className="bg-cyan-500 p-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-0">
            <div className="flex-1 flex items-center justify-center">
              <Image src={logo} alt="Logo" className="h-22 w-auto" />
            </div>
            <div className="flex-1 text-white flex flex-col items-center md:items-end ">
              <div className="text-lg text-end">
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
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
