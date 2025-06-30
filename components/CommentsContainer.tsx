"use client";
import commentImg1 from "@/public/comments/rev-img-1.jpg";
import commentImg2 from "@/public/comments/rev-img-2.jpg";
import commentImg3 from "@/public/comments/rev-img-3.jpg";
import commentImg4 from "@/public/comments/rev-img-4.jpg";
import commentImg5 from "@/public/comments/rev-img-5.jpg";
import commentImg6 from "@/public/comments/rev-img-6.jpg";
import CommentItem from "./CommentItem";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CommentsContainer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const commentsContainerRef = useRef<HTMLDivElement>(null);

  const comments = [
    {
      id: 1,
      name: "Зуева Анастасия",
      image: commentImg1,
      comment:
        "Летали с мужем в ОАЭ, а потом в Катар с турагентством Coral Travel - это было великолепно! Серьезно, качество сервиса ощущалось на каждом из этапов, начиная с заявки на сайте и заканчивая заселение в отель!",
    },
    {
      id: 2,
      name: "Нестерова Ирина",
      image: commentImg2,
      comment:
        "Весной летали с семьей в Турцию, решили попробовать свой тур с Coral Travel в ТРЦ Арт Молл, тем более что нам их посоветовал мой коллега с работы. По цене вышло отлично, сервис, приезд и заселение, все без проблем. Довольна нашим выбором! Спасибо Вам)",
    },
    {
      id: 3,
      name: "Тетерев Игорь",
      image: commentImg3,
      comment:
        "Был в Италии от турагентства Coral Travel, отель подобрали нам отличный, по прилету встреили в аеропорту и заселили, по правде говоря, в начале немного смутили цены, т.к. чуть дешевле средних, и я волновался что с сервисом могут быть проблемы, но нет. Отдых получился чудесным.",
    },
    {
      id: 4,
      name: "Панченко Денис",
      image: commentImg4,
      comment:
        "Уже не один раз путешествовал по миру с турагентством Coral Travel, в последний раз летал в Индию, посмотреть Тадж Махал. Все как всегда на высшем уровне. Если хотите отдых без лишних хлопот и по адекватной стоимости, рекомендую их.",
    },
    {
      id: 5,
      name: "Ломаков Артур",
      image: commentImg5,
      comment:
        "Летал с ними в Болгарию, решил выбрать турагентство Coral Travel в ТРЦ Арт Молл, т.к. на тот момент был самым бюджетным, а мне хотелось просто побывать в новом месте и отдохнуть без напряга. Не подвели, помогли мне отлично отдохнуть и расслабиться, не думая о том какой отель забронировать и как туда добраться.",
    },
  ];

  const scrollToIndex = (index: number) => {
    if (commentsContainerRef.current) {
      const container = commentsContainerRef.current;
      const commentWidth =
        container.children[0]?.clientWidth || container.clientWidth;
      const scrollAmount = index * commentWidth;

      container.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scroll = (direction: "left" | "right") => {
    let newIndex;
    if (direction === "left") {
      newIndex = currentIndex === 0 ? comments.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === comments.length - 1 ? 0 : currentIndex + 1;
    }
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex =
        currentIndex === comments.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
      scrollToIndex(newIndex);
    }, 5000); // Автопрокрутка кожні 5 секунд

    return () => clearInterval(interval);
  }, [currentIndex, comments.length]);

  return (
    <section className="bg-white flex items-center justify-center py-6 sm:py-12">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-6 sm:gap-12 px-4">
        <h2 className="text-2xl sm:text-3xl font-light text-center text-black">
          Відгуки наших клієнтів
        </h2>
        <div className="relative w-full">
          <button
            onClick={() => scroll("left")}
            className="hidden sm:block absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors z-10 shadow-lg"
          >
            <ChevronLeft className="w-12 h-12 text-black" />
          </button>

          <div
            ref={commentsContainerRef}
            className="overflow-hidden w-full"
            style={{ scrollSnapType: "x mandatory" }}
          >
            <div className="flex">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="w-full flex-shrink-0 px-2 sm:px-4"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <CommentItem
                    name={comment.name}
                    image={comment.image}
                    comment={comment.comment}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => scroll("right")}
            className="hidden sm:block absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors z-10 shadow-lg"
          >
            <ChevronRight className="w-12 h-12 text-black" />
          </button>
        </div>

        <div className="flex space-x-2">
          {comments.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                scrollToIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex
                  ? "bg-cyan-500"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
