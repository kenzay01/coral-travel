"use client";
import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { travelDeals } from "@/const/travelDeals";
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
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-red-500 mb-6 text-center">
          НАЙКРАЩІ ЦІНИ НА ТУРИ ЗА НАПРЯМКАМИ
        </h1>

        {/* Countries Dropdown */}
        <div className="relative inline-block">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-cyan-500 text-white px-2 py-1 flex items-center gap-2 min-w-[200px] justify-between hover:bg-cyan-600 transition-colors"
          >
            <span>{selectedCountry}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 bg-cyan-500 shadow-lg z-10 min-w-[200px]">
              {countries.map((country) => (
                <button
                  key={country}
                  onClick={() => handleCountrySelect(country)}
                  className={`block w-full text-left px-2 py-1 text-white hover:bg-cyan-600 transition-colors ${
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
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredDeals.slice(0, 8).map((deal) => (
          <div
            key={deal.id}
            className="bg-white  shadow-md overflow-hidden relative hover:shadow-xl transition-shadow "
          >
            {deal.discount && (
              <div className="absolute top-4 right-4 bg-yellow-400 text-black px-2 py-1 text-sm font-bold transform rotate-12 z-10">
                {deal.discount}
              </div>
            )}

            {/* Image */}
            <div className="h-48 relative">
              <Image
                src={deal.image}
                alt={deal.country}
                layout="fill"
                objectFit="cover"
                className="w-full h-full object-cover"
                quality={60}
              />
            </div>

            <div className="p-4">
              <h3 className="text-xl font-semibold text-cyan-500 mb-2">
                {deal.country}
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-gray-600">від</span>
                  <span className="text-2xl font-bold text-cyan-500">
                    {deal.price}$
                  </span>
                </div>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2  font-semibold transition-colors">
                  Замовити
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center mt-8 space-y-4">
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2  font-semibold transition-colors text-lg">
          Отримати всі пропозиції
        </button>
        <p className="text-lg font-bold">
          Наші експерти підберуть і розрахують вам 5 варіантів відпочинку за 10
          хвилин.
        </p>
        <p className="text-3xl font-bold text-red-500 mb-6 text-center">
          ПЕРЕВІРТЕ НАС ПРЯМО ЗАРАЗ!
        </p>
      </div>

      {filteredDeals.length === 0 && (
        <div className="text-center mt-8">
          <p className="text-gray-600 text-lg">
            Немає доступних турів для обраної країни
          </p>
        </div>
      )}
    </div>
  );
}
