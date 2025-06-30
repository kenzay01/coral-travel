import { Headset } from "lucide-react";
import { House } from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";

export default function BenefitsContainer() {
  const benefits = [
    {
      id: 1,
      text: "Завжди на зв'язку з клієнтом та супроводжуємо його відпочинок",
      img: Headset,
    },
    {
      id: 2,
      text: "Виклик менеджера абсолютно безкоштовно",
      img: BriefcaseBusiness,
    },
    {
      id: 3,
      text: "Можна оформити не виходячи з дому",
      img: House,
    },
  ];

  return (
    <section className="bg-cyan-500 flex items-center justify-center py-12 text-white">
      <div className="max-w-4xl ">
        <h1 className="text-3xl text-center mb-8">
          Ваші переваги відпочинку з Турагентством Coral Travel
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6 px-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="flex flex-col items-center gap-2 mb-8"
            >
              <benefit.img className="w-32 h-32" />
              <p className="text-center ">{benefit.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
