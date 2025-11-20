import TechIcon3D from "../../components/three/TechIcon3D_ReactIcon";
import { techIcons } from "../../data/techIcons";

export default function TechIconsGrid() {
  return (
    <div className="pb-13">
      <div className="flex flex-row flex-wrap">
        {techIcons.map(({ icon: Icon, color }, i) => (
          <div key={i} className="w-[60px] h-[60px] md:w-[100px] md:h-[100px] mx-auto">
            <TechIcon3D Icon={Icon} color={color} />
          </div>
        ))}
      </div>
    </div>
  );
}
