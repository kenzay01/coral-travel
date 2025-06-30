import workWithBg from "@/public/work_with_bg.jpg";
import { Earth } from "lucide-react";
import { Hotel } from "lucide-react";
import { FaMonument } from "react-icons/fa";
import { FaUmbrellaBeach } from "react-icons/fa";

export default function WorkWithContainer() {
  const items = [
    {
      id: 1,
      text: "країн",
      img: <Earth className="w-20 h-20" />,
      numbers: 29,
    },
    {
      id: 2,
      text: "розкішних пляжів",
      img: <FaUmbrellaBeach className="w-20 h-20" />,
      numbers: 2000,
    },
    {
      id: 3,
      text: "шикарних готелів",
      img: <Hotel className="w-20 h-20" />,
      numbers: 9000,
    },
    {
      id: 4,
      text: "визначних пам'яток",
      img: <FaMonument className="w-20 h-20" />,
      numbers: 7000,
    },
  ];

  return (
    <section className="relative py-4 min-h-[400px]">
      <div
        className="absolute inset-0 bg-fixed"
        style={{
          backgroundImage: `url(${workWithBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="z-10 flex flex-col items-center justify-center text-white text-center relative min-h-[400px]">
        <h1 className="text-4xl mb-16">З ким ми працюємо</h1>
        <div className="flex gap-16 flex-wrap flex-col md:flex-row justify-center mt-4 md:mb-0 mb-4 ">
          {items.map((item) => (
            <div key={item.id} className="flex items-center flex-col">
              <div className="mr-2 p-4 border-2 border-yellow-500 rounded-full">
                {item.img}
              </div>
              <div className="text-6xl text-yellow-500">{item.numbers}</div>
              <div className="text-2xl">{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
