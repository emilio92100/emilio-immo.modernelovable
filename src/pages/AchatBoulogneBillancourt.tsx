import CityPageTemplate from "@/components/CityPageTemplate";
import { getCityData } from "@/lib/cities";

const data = getCityData("boulogne-billancourt")!;
const AchatBoulogneBillancourt = () => <CityPageTemplate city={data} />;
export default AchatBoulogneBillancourt;
