"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import formImage from "@/public/form_img.jpg";
import formImage2 from "@/public/form_img_2.png";
import arrowImage from "@/public/arrow.png";
import { sendToBitrix24 } from "@/utils/sendToBitrix";

const countries = [
  { uk: "Австрія" },
  { uk: "Андора" },
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

function CountdownTimer() {
  const [time, setTime] = useState({
    hours: 12,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const createNewTimer = () => {
      const now = Date.now();
      const endTime = now + 12 * 60 * 60 * 1000 + 59 * 60 * 1000 + 59 * 1000;
      return endTime;
    };

    const endTime = createNewTimer();

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

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="bg-yellow-400 text-black px-4 py-2 font-light text-5xl">
      {formatTime(time.hours)}:{formatTime(time.minutes)}:
      {formatTime(time.seconds)}
    </div>
  );
}

interface FormContainerProps {
  type?: 1 | 2;
}

export default function FormContainer({ type }: FormContainerProps) {
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "phone" && value.trim() && !value.startsWith("+380")) {
      if (/^\d/.test(value)) {
        newValue = "+380" + value.replace(/^\d+/, "");
      } else {
        newValue = value.replace(/^\+?38?0?/, "+380");
      }
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    if (name === "name" || name === "phone" || name === "email") {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      name: "",
      phone: "",
      email: "",
    };

    if (formData.name.trim() === "") {
      newErrors.name = "Поле Ваше ім'я є обов'язковим для заповнення.";
    }

    const phoneRegex = /^\+380\d{9}$/;
    if (formData.phone.trim() === "") {
      newErrors.phone = "Поле Ваш телефон є обов'язковим для заповнення.";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Ви ввели некоректний номер.";
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Поле E-mail повинне містити текст.";
    }

    setErrors(newErrors);

    if (newErrors.name || newErrors.phone || newErrors.email) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendToBitrix24(formData);

      if (result.success) {
        console.log("Form submitted successfully:", formData);
        alert(
          "Заявка успішно відправлена! Наш менеджер зв'яжеться з вами найближчим часом."
        );
        setFormData({
          name: "",
          phone: "",
          email: "",
          destination: "",
          wishes: "",
        });
      } else {
        console.error("Помилка при відправці:", result.error);
        alert(
          "Виникла помилка при відправці заявки. Спробуйте ще раз або зв'яжіться з нами за телефоном."
        );
      }
    } catch (error) {
      console.error("Непередбачена помилка:", error);
      alert("Виникла непередбачена помилка. Спробуйте ще раз.");
    } finally {
      setIsSubmitting(false);
    }
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
              <div className="w-80 h-46 md:w-110 md:h-64 bg-transparent overflow-hidden relative">
                <Image
                  src={type === 1 ? formImage : formImage2}
                  alt={"Пасажир в літаку"}
                  layout="fill"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-wrap flex-col md:flex-row gap-4 justify-center items-center mb-4">
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
                  отримайте <br />
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
                  Залиште заявку ЗАРАЗ, та <br /> отримайте актуальні <br />{" "}
                  гарячі тури <br /> від{" "}
                  <span className="text-cyan-500 ">
                    Туристичного агентства <br /> Coral Travel
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
              <div className="flex md:hidden flex-shrink-0 mb-8 justify-center relative">
                <div className="w-80 h-46 bg-transparent overflow-hidden relative">
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
              <div className="flex justify-center lg:justify-end md:mr-16">
                <CountdownTimer />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-cyan-500 py-8">
        <div
          className="max-w-5xl mx-auto px-4"
          id={type === 1 ? "form" : undefined}
        >
          <h2 className="text-white text-xl md:text-3xl font-semibold mb-4 md:mb-8 text-center md:text-start">
            Заповніть форму <br /> та отримайте підбір індивідуального туру за 1
            годину
          </h2>
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                  disabled={isSubmitting}
                ></textarea>
              </div>
            ) : null}
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3.5 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Відправляємо..." : "Підібрати тур"}
              </button>
            </div>
          </form>
          {type === 1 ? (
            <div className="mt-2 w-full mx-auto hidden md:block">
              <textarea
                name="wishes"
                value={formData.wishes}
                onChange={handleInputChange}
                placeholder="Ваші побажання"
                rows={2}
                className="w-full px-4 py-3 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                disabled={isSubmitting}
              ></textarea>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
