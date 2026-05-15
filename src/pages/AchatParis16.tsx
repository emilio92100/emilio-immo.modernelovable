import CityPageTemplate from "@/components/CityPageTemplate";
import { getCityData } from "@/lib/cities";

const data = getCityData("paris-16")!;
const AchatParis16 = () => <CityPageTemplate city={data} />;
export default AchatParis16;
