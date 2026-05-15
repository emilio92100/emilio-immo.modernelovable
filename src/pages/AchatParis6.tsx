import CityPageTemplate from "@/components/CityPageTemplate";
import { getCityData } from "@/lib/cities";

const data = getCityData("paris-6")!;
const AchatParis6 = () => <CityPageTemplate city={data} />;
export default AchatParis6;
