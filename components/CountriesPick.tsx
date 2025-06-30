"use client";
import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { travelDeals } from "@/const/travelDeals";
import Modal from "@/components/Modal";
import Image from "next/image";

const countries = [
  "Всі країни",
  "Танзанія",
  "Мальдіви",
  "ОАЕ",
  "Туреччина",
  "Туніс",
  "Єгипет",
  "Греція",
  "Болгарія",
  "Домінікана",
  "Ізраїль",
  "Індія",
  "Іспанія",
  "Кіпр",
  "Таїланд",
  "Шрі Ланка",
];

export default function CountriesPick() {
  const [selectedCountry, setSelectedCountry] = useState("Всі країни");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter deals based on selected country
  // Shuffle array utility
  function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const filteredDeals = useMemo(() => {
    if (selectedCountry === "Всі країни") {
      return shuffleArray(travelDeals);
    }
    return shuffleArray(
      travelDeals.filter((deal) => deal.country === selectedCountry)
    );
  }, [selectedCountry]);

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <div className="min-h-screen bg-white p-2 md:p-4">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-4 md:mb-8">
          <h1 className="text-lg md:text-4xl font-light text-red-500 mb-4 md:mb-6 text-center px-2">
            НАЙКРАЩІ ЦІНИ НА ТУРИ ЗА НАПРЯМКАМИ
          </h1>

          {/* Countries Dropdown */}
          <div className="relative inline-block w-full md:w-auto">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-cyan-500 text-white px-2 py-1 flex items-center gap-2 w-full md:min-w-[200px] justify-between hover:bg-cyan-600 transition-colors"
            >
              <span className="text-sm md:text-base">{selectedCountry}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 bg-cyan-500 shadow-lg z-10 w-full md:min-w-[200px]">
                {countries.map((country) => (
                  <button
                    key={country}
                    onClick={() => handleCountrySelect(country)}
                    className={`block w-full text-left md:px-2 md:py-2 py-1 text-sm md:text-base text-white hover:bg-cyan-600 transition-colors ${
                      selectedCountry === country ? "bg-blue-600" : ""
                    }`}
                  >
                    {country}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Travel Deals Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
          {filteredDeals.slice(0, 8).map((deal) => (
            <div
              key={deal.id}
              className="bg-white shadow-md overflow-hidden relative hover:shadow-xl transition-shadow"
            >
              {deal.discount && (
                <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-yellow-400 text-black px-1 md:px-2 py-1 text-xs md:text-sm font-bold transform rotate-12 z-10">
                  {deal.discount}
                </div>
              )}

              {/* Image */}
              <div className="h-32 md:h-48 relative">
                <Image
                  src={deal.image}
                  alt={deal.country}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full object-cover"
                  quality={40}
                  placeholder="blur"
                  blurDataURL={deal.image}
                  priority
                />
              </div>

              <div className="p-2 md:p-4">
                <h3 className="text-sm md:text-xl font-semibold text-cyan-500 mb-1 md:mb-2">
                  {deal.country}
                </h3>
                <div className="flex items-center justify-between flex-col md:flex-row gap-2 md:gap-0">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-600 text-xs md:text-base">
                      від
                    </span>
                    <span className="text-lg md:text-2xl font-bold text-cyan-500">
                      {deal.price}$
                    </span>
                  </div>
                  <button
                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-2 md:px-4 py-1 md:py-2 font-semibold transition-colors text-xs md:text-base w-full md:w-auto"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Замовити
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center mt-4 md:mt-8 space-y-2 md:space-y-4 px-2">
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 font-semibold transition-colors text-base md:text-lg"
            onClick={() => setIsModalOpen(true)}
          >
            Отримати всі пропозиції
          </button>
          <p className="text-sm md:text-lg font-bold text-center">
            Наші експерти підберуть і розрахують вам 5 варіантів відпочинку за
            10 хвилин.
          </p>
          <p className="text-lg md:text-4xl font-light text-red-500 mb-3 md:mb-6 text-center">
            ПЕРЕВІРТЕ НАС ПРЯМО ЗАРАЗ!
          </p>
        </div>

        {filteredDeals.length === 0 && (
          <div className="text-center mt-4 md:mt-8">
            <p className="text-gray-600 text-base md:text-lg">
              Немає доступних турів для обраної країни
            </p>
          </div>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
