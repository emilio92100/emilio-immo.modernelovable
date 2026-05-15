import CityPageTemplate from "@/components/CityPageTemplate";
import { getCityData } from "@/lib/cities";

const data = getCityData("paris-15")!;
const AchatParis15 = () => <CityPageTemplate city={data} />;
export default AchatParis15;
