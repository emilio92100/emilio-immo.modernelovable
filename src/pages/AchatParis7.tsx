import CityPageTemplate from "@/components/CityPageTemplate";
import { getCityData } from "@/lib/cities";

const data = getCityData("paris-7")!;
const AchatParis7 = () => <CityPageTemplate city={data} />;
export default AchatParis7;
