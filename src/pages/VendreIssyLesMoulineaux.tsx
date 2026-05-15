import SellCityPageTemplate from "@/components/SellCityPageTemplate";
import { getCityData } from "@/lib/cities";
import { getSellCityData } from "@/lib/sellCities";

const slug = "issy-les-moulineaux";
const VendreIssyLesMoulineaux = () => (
  <SellCityPageTemplate city={getCityData(slug)!} sell={getSellCityData(slug)!} />
);
export default VendreIssyLesMoulineaux;