import CityPageTemplate from "@/components/CityPageTemplate";
import { getCityData } from "@/lib/cities";

const data = getCityData("neuilly-sur-seine")!;
const AchatNeuillySurSeine = () => <CityPageTemplate city={data} />;
export default AchatNeuillySurSeine;
