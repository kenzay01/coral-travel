import signImg from "@/public/sign.png";
import Image from "next/image";
export default function Header() {
  return (
    <header className="bg-transparent fixed top-0 z-50 h-44 w-full">
      <div className="absolute flex left-10 top-1/2 transform -translate-y-1/2 items-center justify-center h-32 w-32">
        <Image
          src={signImg}
          alt="Sign"
          className="object-contain w-full h-full bg-white rounded-full"
        />
      </div>
      <div className="max-w-4xl pt-6 mx-auto flex justify-end">
        <a
          href="tel:+380444999939"
          className="font-light bg-red-600 text-white animate-pulse text-lg hover:underline"
        >
          +38 (044) 499-99-39
        </a>
      </div>
    </header>
  );
}
