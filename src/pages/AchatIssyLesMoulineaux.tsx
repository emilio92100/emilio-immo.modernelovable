import CityPageTemplate from "@/components/CityPageTemplate";
import { getCityData } from "@/lib/cities";

const data = getCityData("issy-les-moulineaux")!;
const AchatIssyLesMoulineaux = () => <CityPageTemplate city={data} />;
export default AchatIssyLesMoulineaux;
