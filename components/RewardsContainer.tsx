import Image from "next/image";
import rewardImg from "@/public/reward.jpg";
export default function RewardsContainer() {
  return (
    <section className="flex flex-col gap-4 justify-center items-center py-2 mb-2">
      <h1 className="text-lg md:text-4xl font-light text-red-500 mb-6 text-center uppercase">
        Наші нагороди
      </h1>
      <Image src={rewardImg} alt="Reward" className="h-[400px] w-auto" />
    </section>
  );
}
