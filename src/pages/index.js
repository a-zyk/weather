import { useEffect, useState } from "react";
import axios from "axios";
import City from "@/components/CitySelect";
import Weather from "@/components/Weather";
import Background from "@/components/Background";
export default function Home() {
  const [selectedCity,setSelectedCity] = useState({});
  const [weather, setWeather] = useState([]);

  return (
    <>
      <City onCitySelect={setSelectedCity} />
      <Weather onWeatherSelect={setWeather} weather={weather} selectedCity={selectedCity}/>
      <Background weather={weather}/>
    </>
  );
}
