import { useEffect } from "react";
import axios from "axios";
import Image from "next/image";

const Weather = ({ selectedCity, onWeatherSelect, weather }) => {
  const KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;
  useEffect(() => {
    if (!Object.keys(selectedCity).length) return;

    const getWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${selectedCity.lat}&lon=${selectedCity.lon}&appid=${KEY}&units=metric`
        );
        let res = response.data;
        return onWeatherSelect(res);
      } catch (error) {
        console.log(error);
      }
    };
    getWeather();
  }, [selectedCity]);
  let temperatureData;
  console.log(weather)
  if (Object.keys(weather).length) {
    const currentWeather = weather.weather[0];
    const name = [...new Set([weather.name, selectedCity.name])].join(", ");
    temperatureData = (
      <div className="flex flex-col items-center justify-center p-6">
        <p className="text-2xl">{name}</p>
        <div className="flex gap-2 items-center">
          <Image
            width="100"
            height="100"
            alt=""
            src={`http://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
          />
          <p className="text-2xl font-semibold">{currentWeather.main}</p>
          <p className="text-5xl">{weather.main.temp} &#8451;</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div>{temperatureData}</div>
    </>
  );
};

export default Weather;
