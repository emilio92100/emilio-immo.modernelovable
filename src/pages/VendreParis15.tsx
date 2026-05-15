import SellCityPageTemplate from "@/components/SellCityPageTemplate";
import { getCityData } from "@/lib/cities";
import { getSellCityData } from "@/lib/sellCities";

const slug = "paris-15";
const VendreParis15 = () => (
  <SellCityPageTemplate city={getCityData(slug)!} sell={getSellCityData(slug)!} />
);
export default VendreParis15;