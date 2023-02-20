import Image from "next/image";

const DRIZZLE = "/drizzle.jpg";
const FOG = "/fog.bak.jpg";
const CLOUDS = "/clouds.jpg";
const CLEAR = "/sunny.bak.jpg";
const THUNDER = "/thunder.jpg";
const RAIN = "/rain.bak.jpg";
const SNOW = "/snow.bak.jpg";

const Background = ({ weather }) => {
  if (!Object.keys(weather).length)
    return <Image className="z-[-1] " fill src={CLOUDS} alt={CLOUDS} />;
  let source = "";
  const id = weather.weather[0].id;
  if (id >= 801 && id < 805) {
    source = CLOUDS;
  } else if (id == 800) {
    source = CLEAR;
  } else if (id >= 200 && id < 233) {
    source = THUNDER;
  } else if (id >= 300 && id < 322) {
    source = DRIZZLE;
  } else if (id >= 500 && id < 531) {
    source = RAIN;
  } else if (id >= 600 && id < 622) {
    source = SNOW;
  } else if (id >= 701 && id < 782) {
    source = FOG;
  }

  return <Image className="z-[-1] " fill src={source} alt={source.key} />;
};

export default Background;
