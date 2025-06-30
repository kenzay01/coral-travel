import { FaFacebookF, FaTwitter, FaTelegramPlane } from "react-icons/fa";

export default function Footer() {
  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/anextour",
      icon: <FaFacebookF className="text-white" />,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/anextour",
      icon: <FaTwitter className="text-white" />,
    },
    {
      name: "Telegram",
      url: "https://t.me/goryashiy_tur",
      icon: <FaTelegramPlane className="text-white" />,
    },
  ];
  return (
    <footer className="bg-cyan-600 p-2">
      <p className="md:hidden text-white flex justify-center mb-2">
        iHН - 2912002725
      </p>
      <div className="max-w-5xl flex md:justify-end md:items-end items-center justify-center mx-auto gap-4">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 border-2 border-yellow-500 hover:border-white rounded-full"
          >
            {link.icon}
          </a>
        ))}
      </div>
    </footer>
  );
}
