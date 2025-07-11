import { FolderLock } from "lucide-react";
import { Percent } from "lucide-react";
import { ThumbsUp } from "lucide-react";
import { Phone } from "lucide-react";

export default function Offers2Container() {
  const offers = [
    {
      id: 1,
      titleKey: "Конфіденційність",
      contentKey: "Інформація про клієнтів під надійним захистом.",
      img: <FolderLock className="w-26 h-26 text-cyan-500" />,
    },
    {
      id: 2,
      titleKey: "Найкращі пропозиції",
      contentKey: "Пропонуємо тури з найкращим співвідношенням ціна/якість.",
      img: <Percent className="w-26 h-26 text-cyan-500" />,
    },
    {
      id: 3,
      titleKey: "Впевненість як готель та сервіс",
      contentKey: "Співпрацюємо тільки з особисто перевіреними готелями.",
      img: <ThumbsUp className="w-26 h-26 text-cyan-500" />,
    },
    {
      id: 4,
      titleKey: "Підтримку у відпустці",
      contentKey:
        "Туристична агенція Coral Travel приділяє особливу увагу контролю якості послуг на всіх етапах.",
      img: <Phone className="w-26 h-26 text-cyan-500" />,
    },
  ];

  return (
    <section className="bg-white flex items-center justify-center py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl text-center mb-12">Ми даємо нашим клієнтам</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="flex flex-col items-center gap-2 mb-8 text-center "
            >
              {offer.img}
              <h2 className="text-lg mb-2 md:mb-0">{offer.titleKey}</h2>
              <p className="text-lg w-64 md:w-full">{offer.contentKey}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
