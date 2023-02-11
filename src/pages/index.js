import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState({});
  const [cityInfo, setCityInfo] = useState({});
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const fake = { lat: 51.5085, lon: -0.1257 };
  const KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

  useEffect(() => {
    const getLocation = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${KEY}`
        );
        let res = response.data;

        return setCityInfo(res);
      } catch (error) {
        console.log(error);
      }
    };
    getLocation();
  }, [search]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityInfo.lat}&lon=${cityInfo.lon}&appid=${KEY}&units=metric`
        );
        let res = response.data;

        return setData(res);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [cityInfo]);

  const handleCitySearch = () => {
    setSearch(city);
  };

  console.log(cityInfo);
  return (
    <>
      <input
        onChange={(e) => setCity(e.target.value)}
        className="border-2 "
        type="text"
        placeholder="City"
      ></input>
      <button
        onClick={handleCitySearch}
        className="block px-4 py-2 rounded bg-pink-400 text-sm text-gray-700 hover:bg-gray-100 "
      >
        Search
      </button>
      <div> {JSON.stringify(cityInfo.lat)}</div>
     
    </>
  );

  // if (data && data.main && data.main.temp && data.name)
  //   return (
  //     <>
  //     <div className="flex flex-col justify-center m-auto items-center  max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow ">
  //     <input onChange={(e) => setCity(e.target.value)} className="border-2 " type="text" placeholder="City"></input>
  //     <button onClick={handleCitySearch} className="block px-4 py-2 rounded bg-pink-400 text-sm text-gray-700 hover:bg-gray-100 ">Search</button>
  //     <div>
  //       {data.name }

  //       {data.main.temp} C
  //     </div>
  //     </div>

  //     </>
  //   );
  return (
    <>
      <div>woops</div>
    </>
  );
}
