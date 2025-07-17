"use client";
import Image from "next/image";
import { useState } from "react";
import mainBanner from "@/public/mainBanner.jpg";
import logoImg from "@/public/logo.png";
import Modal from "@/components/Modal";
import { sendToBitrix24 } from "@/utils/sendToBitrix";

export default function MainBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    wishes: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (name === "name" || name === "phone") {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: "",
      phone: "",
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

    setErrors(newErrors);

    if (newErrors.name || newErrors.phone) {
      return;
    }

    setIsSubmitting(true);

    try {
      const bitrixResult = await sendToBitrix24({
        name: formData.name,
        phone: formData.phone,
        wishes: formData.wishes || "Заявка з головного банеру",
      });

      if (bitrixResult.success) {
        console.log("Форма успішно відправлена до Bitrix24");
        setFormData({ name: "", phone: "", wishes: "" });
        setErrors({ name: "", phone: "" });
      } else {
        console.error("Помилка при відправці до Bitrix24:", bitrixResult.error);
        alert("Сталася помилка при відправці форми. Спробуйте ще раз.");
      }
    } catch (error) {
      console.error("Загальна помилка:", error);
      alert("Сталася помилка при відправці форми. Спробуйте ще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="relative min-h-screen">
        <div className="absolute inset-0">
          <Image
            src={mainBanner}
            alt="Ancient ruins background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-14 pb-12 flex flex-col items-center justify-center">
          <div className="hidden md:flex justify-between items-start w-full mb-8 max-w-4xl">
            <Image src={logoImg} alt="Logo" />
            <button
              className="text-yellow-400 border-b-2 border-dashed font-medium text-md transition-colors"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Замовити дзвінок
            </button>
          </div>
          <div className="text-center mb-12 mt-8 md:mt-0">
            <h1 className={`text-2xl md:text-5xl font-medium text-white mb-4 `}>
              Професійний підбір туру під ваші <br /> особисті побажання
            </h1>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-center md:items-start justify-center">
            <div
              className="hidden lg:block bg-cyan-500 px-8 py-4 text-white relative rounded-lg w-[500px]"
              style={{
                clipPath: "polygon(75% 0%, 100% 51%, 76% 100%, 0% 100%, 0% 0%)",
              }}
            >
              <h2 className="text-2xl font-bold my-2 max-w-[400px] uppercase">
                Отримайте <br /> персональний підбір <br /> туру за 1 ГОДИНУ
              </h2>
              <div className="space-y-3 mb-6 ">
                <p>
                  Акція! Кожному клієнту індивідуальна особиста знижка! <br />
                  Просто заповніть форму.
                </p>
                <p>Поспішайте, тимчасова акція!</p>
              </div>
            </div>
            <div
              className="block lg:hidden bg-cyan-500 p-4 pt-2 text-white relative rounded-lg h-[380px] max-w-[380px] text-center"
              style={{
                clipPath: "polygon(100% 0, 100% 86%, 51% 100%, 0 86%, 0 0)",
              }}
            >
              <h2 className="text-3xl font-bold my-2 max-w-[400px] uppercase">
                Отримайте <br /> персональний підбір <br /> туру за 1 ГОДИНУ
              </h2>
              <div className="space-y-3 mb-6 text-lg">
                <p>
                  Акція! Кожному клієнту індивідуальна особиста знижка! <br />
                  Просто заповніть форму.
                </p>
                <p>Поспішайте, тимчасова акція!</p>
              </div>
            </div>
            <div className="bg-black/40 p-4 md:p-8 rounded-lg border-4 border-yellow-400 max-w-sm">
              <h3 className="text-3xl font-medium text-yellow-400 mb-2 text-center">
                Заповніть форму зараз
              </h3>
              <p className="text-white mb-6">
                та отримайте 5 варіантів відпочинку всього за 1 ГОДИНУ
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Ваше ім'я*"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-white w-full px-4 py-3 border text-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    disabled={isSubmitting}
                    required
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Ваш телефон*"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-white w-full px-4 py-3 border text-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    disabled={isSubmitting}
                    required
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
                <textarea
                  name="wishes"
                  placeholder="Ваші побажання"
                  value={formData.wishes}
                  onChange={handleInputChange}
                  rows={4}
                  className="bg-white w-full px-4 py-3 border text-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Відправляється..." : "Надіслати"}
                </button>
              </form>
              <p className="text-white text-sm text-center mt-4">
                Наш менеджер зв`яжеться з Вами найближчим часом
              </p>
            </div>
          </div>
          <div className="mt-16 text-center ">
            <div className="bg-black/50 inline-block py-2 px-4 md:px-8 md:py-4 rounded-lg">
              <p className="text-white mb-4 font-medium">
                До оплати приймаємо:
              </p>
              <div className="flex items-center justify-center space-x-2 md:space-x-4">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png"
                  alt=""
                  className="w-16 h-10 rounded-sm"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Old_Visa_Logo.svg/2560px-Old_Visa_Logo.svg.png"
                  alt=""
                  className="w-16 h-10 rounded-sm"
                />
                <img
                  src="https://play-lh.googleusercontent.com/VciK8VupOQM4EcOwr0M0nOVN34kao52yVxwlKkF3OFim3i4QNVpzAKHrJEDvVwD4QVNn"
                  alt=""
                  className="w-11 h-11 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
