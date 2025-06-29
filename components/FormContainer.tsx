"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
// import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
// import { useDictionary } from "@/hooks/getDictionary";
// import { Locale } from "@/i18n/config";
import formImage from "@/public/form_img.jpg"; // Зображення літака
import formImage2 from "@/public/form_img_2.png"; // Додаткове зображення літака
import arrowImage from "@/public/arrow.png"; // Зображення стрілки

const countries = [
  { uk: "Австрія" },
  { uk: "Андора" },
  { uk: "Білорусь" },
  { uk: "Болгарія" },
  { uk: "Угорщина" },
  { uk: "Греція" },
  { uk: "Грузія" },
  { uk: "Домінікана" },
  { uk: "Єгипет" },
  { uk: "Індонезія" },
  { uk: "Іспанія" },
  { uk: "Італія" },
  { uk: "Китай" },
  { uk: "Куба" },
  { uk: "Латвія" },
  { uk: "Литва" },
  { uk: "Маврикій" },
  { uk: "Мальдіви" },
  { uk: "Мексика" },
  { uk: "ОАЕ" },
  { uk: "Португалія" },
  { uk: "Сейшели" },
  { uk: "Таїланд" },
  { uk: "Туреччина" },
  { uk: "Україна" },
  { uk: "Франція" },
  { uk: "Чехія" },
  { uk: "Шрі Ланка" },
  { uk: "Естонія" },
];

// Окремий компонент для таймера зворотного відліку
function CountdownTimer() {
  const [time, setTime] = useState({
    hours: 12,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    // Перевіряємо чи є збережений час в localStorage
    const savedEndTime = localStorage.getItem("countdown-end-time");
    const now = Date.now();

    let endTime: number;

    if (savedEndTime) {
      endTime = parseInt(savedEndTime);
      // Якщо час закінчився, створюємо новий таймер
      if (endTime <= now) {
        endTime = now + 12 * 60 * 60 * 1000 + 59 * 60 * 1000 + 59 * 1000; // 12:59:59
        localStorage.setItem("countdown-end-time", endTime.toString());
      }
    } else {
      // Створюємо новий таймер на 12:59:59
      endTime = now + 12 * 60 * 60 * 1000 + 59 * 60 * 1000 + 59 * 1000;
      localStorage.setItem("countdown-end-time", endTime.toString());
    }

    // Функція для оновлення таймера
    const updateTimer = () => {
      const currentTime = Date.now();
      const timeLeft = endTime - currentTime;

      if (timeLeft <= 0) {
        setTime({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setTime({ hours, minutes, seconds });
    };

    // Оновлюємо таймер одразу
    updateTimer();

    // Встановлюємо інтервал
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="bg-yellow-400 text-black px-4 py-2  font-bold text-5xl">
      {formatTime(time.hours)}:{formatTime(time.minutes)}:
      {formatTime(time.seconds)}
    </div>
  );
}

interface FormContainerProps {
  type?: 1 | 2;
}

export default function FormContainer({ type }: FormContainerProps) {
  //   const currentLocale = useCurrentLanguage() as Locale;
  //   const { dict, loading } = useDictionary(currentLocale);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    destination: "",
    wishes: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
  });

  //   if (loading || !dict) {
  //     return <div className="h-96 bg-gray-100"></div>;
  //   }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Очищуємо помилку при введенні тексту
    if (name === "name" || name === "phone" || name === "email") {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      name: "",
      phone: "",
      email: "",
    };

    // Валідація
    if (formData.name.trim() === "") {
      newErrors.name = "Поле Ваше ім'я є обов'язковим для заповнення.";
    }

    if (formData.phone.trim() === "") {
      newErrors.phone = "Поле Ваш телефон є обов'язковим для заповнення.";
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Поле E-mail повинне містити текст.";
    }

    setErrors(newErrors);

    // Якщо є помилки, не відправляємо форму
    if (newErrors.name || newErrors.phone || newErrors.email) {
      return;
    }

    console.log("Form submitted:", formData);
    alert("Заявка відправлена! Перевірте консоль для деталей.");
    setFormData({
      name: "",
      phone: "",
      email: "",
      destination: "",
      wishes: "",
    });
  };

  return (
    <section
      className="flex flex-col relative"
      id={type === 1 ? "offers" : "hot-tours"}
    >
      <div className="bg-white py-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col gap-2 md:gap-8 relative">
            <div className="hidden md:block flex-shrink-0 absolute left-0 bottom-0">
              <div className="w-80 h-46 md:w-110 md:h-64 bg-transparent  overflow-hidden relative">
                <Image
                  src={type === 1 ? formImage : formImage2}
                  alt={"Пасажир в літаку"}
                  layout="fill"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center items-center mb-4">
              <div className="relative">
                <span className="bg-red-600 text-white px-4 md:px-2 py-1 font-bold animate-pulse text-5xl">
                  {type === 1 ? "Акція" : "УВАГА!"}
                </span>
              </div>
              <span className="text-cyan-500 font-bold text-2xl md:text-5xl">
                {type === 1 ? "Тільки у нас!" : "Палаючий тур"}
              </span>
            </div>
            <div className="flex-1 text-center lg:text-right relative">
              {type === 1 ? (
                <div className="text-3xl md:text-5xl text-black mb-4 font-sans relative">
                  Залишіть заявку{" "}
                  <span className="text-cyan-500">СЬОГОДНІ</span> <br /> та
                  отримайте сертифікат на
                  <br />{" "}
                  <span className="text-cyan-500 uppercase">захоплюючу</span>
                  <br />{" "}
                  <span className="text-cyan-500 uppercase">
                    екскурсію
                  </span> та <br />{" "}
                  <span className="text-cyan-500 uppercase">
                    особистий дзвінок
                  </span>{" "}
                  <br />{" "}
                  <span className="text-cyan-500 uppercase">менеджера</span>{" "}
                  <br /> до вильоту.
                  <Image
                    src={arrowImage}
                    alt={"Стрілка"}
                    className="absolute -bottom-60 right-0 transform -translate-x-1/2 hidden md:block"
                    width={45}
                    height={45}
                  />
                </div>
              ) : (
                <div className="text-5xl text-black mb-4 font-sans relative">
                  Залишіть заявку ЗАРАЗ, та <br /> отримайте актуальні <br />{" "}
                  гарячі тури <br /> от{" "}
                  <span className="text-cyan-500 ">
                    Турагентства <br /> Coral Travel
                  </span>
                  <Image
                    src={arrowImage}
                    alt={"Стрілка"}
                    className="absolute -bottom-60 right-0 transform -translate-x-1/2 hidden md:block"
                    width={45}
                    height={45}
                  />
                </div>
              )}

              <div className="flex md:hidden flex-shrink-0 mb-8  justify-center relative">
                <div className="w-80 h-46 bg-transparent  overflow-hidden relative">
                  <Image
                    src={type === 1 ? formImage : formImage2}
                    alt={"Пасажир в літаку"}
                    layout="fill"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Image
                  src={arrowImage}
                  alt={"Стрілка"}
                  className="absolute -bottom-40 right-1/50 transform -translate-x-1/2"
                  width={35}
                  height={35}
                />
              </div>
              {/* Таймер */}
              <div className="flex justify-center lg:justify-end md:mr-16">
                <CountdownTimer />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Нижня частина з формою */}
      <div className="bg-cyan-500 py-8">
        {/* Фон з літаками */}
        <div
          className="max-w-5xl mx-auto px-4"
          id={type === 1 ? "form" : undefined}
        >
          <h2 className="text-white text-xl md:text-3xl font-semibold mb-4 md:mb-8 text-center md:text-start">
            Заповніть форму <br /> та отримайте підбір індивідуального туру за 1
            годину
          </h2>

          {/* Форма */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-wrap gap-2 justify-center items-end"
          >
            <div className="flex-1 min-w-[150px] md:min-w-[175px] max-w-[200px]">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ваше ім'я*"
                className="w-full px-4 py-3 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                // required
              />
              {errors.name && (
                <p className="text-red-600 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div className="flex-1 min-w-[150px] md:min-w-[175px] max-w-[200px]">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Ваш телефон*"
                className="w-full px-4 py-3 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                // required
              />
              {errors.phone && (
                <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            <div className="flex-1 min-w-[150px] md:min-w-[175px] max-w-[200px]">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Ваш E-mail*"
                className="w-full px-4 py-3 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                // required
              />
              {errors.email && (
                <p className="text-red-600 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="flex-1 min-w-[150px] md:min-w-[175px] max-w-[200px]">
              <select
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border text-gray-500 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white h-12.5"
              >
                <option value="">Летим в</option>

                {countries.map((country) => (
                  <option key={country.uk} value={country.uk}>
                    {country.uk}
                  </option>
                ))}
              </select>
            </div>
            {type === 1 ? (
              <div className="mt-2 w-full mx-auto block md:hidden max-w-[310px]">
                <textarea
                  name="wishes"
                  value={formData.wishes}
                  onChange={handleInputChange}
                  placeholder="Ваші побажання"
                  rows={2}
                  className="w-full px-4 py-3 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                ></textarea>
              </div>
            ) : null}
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3.5 transition-colors duration-300"
              >
                Підібрати тур
              </button>
            </div>
          </form>

          {/* Поле для побажань */}
          {type === 1 ? (
            <div className="mt-2 w-full mx-auto hidden md:block">
              <textarea
                name="wishes"
                value={formData.wishes}
                onChange={handleInputChange}
                placeholder="Ваші побажання"
                rows={2}
                className="w-full px-4 py-3 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
              ></textarea>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
