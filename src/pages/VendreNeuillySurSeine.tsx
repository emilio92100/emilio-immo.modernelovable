import SellCityPageTemplate from "@/components/SellCityPageTemplate";
import { getCityData } from "@/lib/cities";
import { getSellCityData } from "@/lib/sellCities";

const slug = "neuilly-sur-seine";
const VendreNeuillySurSeine = () => (
  <SellCityPageTemplate city={getCityData(slug)!} sell={getSellCityData(slug)!} />
);
export default VendreNeuillySurSeine;