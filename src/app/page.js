import HeaderCarousal from "@/components/HeaderCarousal";
import OurCollections from "@/components/OurCollections";
import Banner from "@/components/Banner";
import Sales from "@/components/Sales";
import DualTiles from "@/components/DualTiles";
import ItemSale from "@/components/ItemSale";
import CounterSale from "@/components/CounterSale";
import MissionnNews from "@/components/MissionnNews";

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
      <MissionnNews />
    </>
  );
}
