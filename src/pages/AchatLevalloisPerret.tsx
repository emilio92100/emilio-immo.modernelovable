import CityPageTemplate from "@/components/CityPageTemplate";
import { getCityData } from "@/lib/cities";

const data = getCityData("levallois-perret")!;
const AchatLevalloisPerret = () => <CityPageTemplate city={data} />;
export default AchatLevalloisPerret;
