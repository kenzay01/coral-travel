import beach from "@/public/offers/beach.jpg";
import exсurse from "@/public/offers/excurse.jpg";
import islands from "@/public/offers/islands.jpg";
import skis from "@/public/offers/skis.jpg";
import Image from "next/image";

export default function OffersContainer() {
  const offers = [
    {
      id: 1,
      title: "Пляжі",
      description:
        "Один із найприємніших моментів у житті – поринути у прозору морську воду і лягти на шезлонг під спекотні промені сонця, не турбуючись і не переймаючись ні про що. Турагентство Coral Travel пропонує відправитися на пляжний відпочинок за кордон, провести відпустку в найкращих пляжних готелях світу, подивитися на найпопулярніші курорти та отримати масу нових позитивних вражень.",
      image: beach,
    },
    {
      id: 2,
      title: "Екскурсійний відпочинок",
      description:
        "Екскурсійні тури – найкращий спосіб відпочити та чудово провести час у будь-якій країні. Професійні гіди та екскурсоводи повідають вам про такі події та факти, які вам важко буде дізнатися самостійно. Екскурсійний відпочинок не тільки зарядить вас здоров'ям та енергією, але й допоможе повернути інтерес до життя у всіх його проявах.",
      image: exсurse,
    },
    {
      id: 3,
      title: "Гірськолижні курорти",
      description:
        "Відпочинок на гірськолижних курортах – один із найпопулярніших способів провести відпустку в русі та отримати масу приємних спогадів та відмінний заряд бадьорості. Турагентство Coral Travel пропонує гірськолижні тури на будь-який смак.",
      image: skis,
    },
    {
      id: 4,
      title: "Острови",
      description:
        "Відпочинок на островах – чудовий вибір, який дарує мандрівникам гармонію спокою та море яскравих вражень. Мальдівські острови або острови Карибського моря або виберете загадкову Шрі-Ланку – на островах ви знайдете якісні готелі та відмінний сервіс.",
      image: islands,
    },
  ];

  return (
    <section className="bg-cyan-500 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-semibold text-white text-center mb-12">
          Турагентство Coral Travel пропонує
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white overflow-hidden shadow-2xl hover:shadow-3xl transform hover:scale-103 transition-all duration-300"
            >
              <div className="relative">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              <div className="p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                  {offer.title}
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {offer.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
