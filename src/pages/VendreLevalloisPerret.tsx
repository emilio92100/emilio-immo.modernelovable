import SellCityPageTemplate from "@/components/SellCityPageTemplate";
import { getCityData } from "@/lib/cities";
import { getSellCityData } from "@/lib/sellCities";

const slug = "levallois-perret";
const VendreLevalloisPerret = () => (
  <SellCityPageTemplate city={getCityData(slug)!} sell={getSellCityData(slug)!} />
);
export default VendreLevalloisPerret;