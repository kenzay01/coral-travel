import Header from "@/components/Header";
import MainBanner from "@/components/MainBanner";
import FormContainer from "@/components/FormContainer";
export default function Home() {
  return (
    <div className="relative">
      <Header />
      <MainBanner />
      <FormContainer type={1} />
      <FormContainer type={2} />
      {/* Додатковий контент або компоненти можна додати тут */}
    </div>
  );
}
