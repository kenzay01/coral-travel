import Header from "@/components/Header";
import MainBanner from "@/components/MainBanner";
import FormContainer from "@/components/FormContainer";
import CountriesPick from "@/components/CountriesPick";
import RewardsContainer from "@/components/RewardsContainer";
import BenefitsContainer from "@/components/BenefitsContainer";
import WorkWithContainer from "@/components/WorkWithContainer";
import OffersContainer from "@/components/OffersContainer";
import Offers2Container from "@/components/Offers2Container";
import SchemaComponent from "@/components/SchemaComponent";
import PartnersContainer from "@/components/PartnersContainer";
import IndividualComponent from "@/components/IndividualComponent";
import CommentsContainer from "@/components/CommentsContainer";
import MapContainer from "@/components/MapContainer";
import RightSideButtons from "@/components/RightSideButtons";
import TelegramPopup from "@/components/TelegramPopup";
import CallSection from "@/components/CallSection";
export default function Home() {
  return (
    <div className="relative">
      <Header />
      <MainBanner />
      <FormContainer type={1} />
      <CountriesPick />
      <RewardsContainer />
      <BenefitsContainer />
      <WorkWithContainer />
      <OffersContainer />
      <FormContainer type={2} />
      <Offers2Container />
      <SchemaComponent />
      <PartnersContainer />
      <IndividualComponent />
      <CommentsContainer />
      <CallSection />
      <MapContainer />
      <RightSideButtons />
      <TelegramPopup />
    </div>
  );
}
