"use client";
import signImg from "@/public/sign.png";
import Image from "next/image";
import logoImg from "@/public/logo.png";
import Modal from "@/components/Modal";
import { useState } from "react";
export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <header className="bg-black/70 lg:bg-transparent fixed top-0 z-50 h-auto md:h-44 w-full pointer-events-none">
        {/* Desktop version - left circle logo */}
        <div className="hidden lg:flex absolute left-10 top-1/2 transform -translate-y-1/2 items-center justify-center h-32 w-32 pointer-events-auto">
          <Image
            src={signImg}
            alt="Sign"
            className="object-contain w-full h-full bg-white rounded-full"
          />
        </div>

        {/* Mobile version - full layout */}
        <div className="md:hidden flex items-center justify-between h-full py-2 px-1 pointer-events-auto">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Image
              src={logoImg}
              alt="Logo"
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Right side - Contact info */}
          <div className="flex flex-col items-end space-y-1">
            <a
              href="tel:+380444999939"
              className="font-light bg-red-600 text-white animate-pulse text-sm hover:underline"
            >
              +38 (044) 499-99-39
            </a>
            <button
              className="text-yellow-400 border-b border-dashed border-yellow-400 font-medium text-lg transition-colors hover:text-yellow-300"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Замовити дзвінок
            </button>
          </div>
        </div>

        {/* Desktop version - right side contact info */}
        <div className="hidden md:block max-w-4xl pt-6 mx-auto">
          <div className="flex flex-col items-end justify-end">
            <a
              href="tel:+380444999939"
              className="font-light bg-red-600 text-white animate-pulse text-lg hover:underline pointer-events-auto"
            >
              +38 (044) 499-99-39
            </a>
            <button
              className="text-yellow-400 md:hidden border-b border-dashed border-yellow-400 font-medium text-lg transition-colors hover:text-yellow-300"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Замовити дзвінок
            </button>
          </div>
        </div>
      </header>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
