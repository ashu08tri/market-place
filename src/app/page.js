import HeaderCarousal from "@/components/HeaderCarousal";
import OurCollections from "@/components/OurCollections";
import Banner from "@/components/Banner";
import Sales from "@/components/Sales";
import DualTiles from "@/components/DualTiles";
import ItemSale from "@/components/ItemSale";
import CounterSale from "@/components/CounterSale";
import Review from "@/components/Review";
import MissionnNews from "@/components/MissionnNews";
import BeforeAfter from "@/components/BeforeAfter";

export default function Home() {
  return (
    <>
      <HeaderCarousal />
      <OurCollections />
      <Banner />
      <Sales />
      <DualTiles />
      <ItemSale />
      <CounterSale />
      <Review />
      <BeforeAfter/>
      <MissionnNews />
    </>
  );
}
