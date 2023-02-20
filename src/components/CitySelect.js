import { useState, useEffect } from "react";
import axios from "axios";

const CitySearch = ({ onCitySelect }) => {
  const [availableCities, setAvailableCities] = useState([]);
  const [citySearchInput, setCitySearchInput] = useState("");

  const [selectedCity, setSelectedCity] = useState([]);
  const [search, setSearch] = useState("");
  const [searchTimeout, setSearchTimeout] = useState();

  const KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;
  useEffect(() => {
    const getLocation = async () => {
      try {
        if (citySearchInput.length === 0) return setAvailableCities([]);
        const response = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${citySearchInput}&limit=5&appid=${KEY}`
        );
        let res = response.data;
        return setAvailableCities(res);
      } catch (error) {
        console.log(error);
      }
    };
    getLocation();
  }, [search]);

  const setInputValueFromInput = (value) => {
    setCitySearchInput(value);

    clearTimeout(searchTimeout);
    const timeoutId = setTimeout(() => {
      setSearch(citySearchInput);
    }, 200);
    setSearchTimeout(timeoutId);
  };

  const setInputValueFromList = (city) => {
    setSelectedCity(city);
    onCitySelect(city);
    setCitySearchInput(`${city.name},${city.country}`);
    setAvailableCities([]);
  };

  return (
    <>
      <div className="flex justify-between items-center max-w-[500px] w-full m-auto pt-4 px-4 text-white z-10">
        <div className="relative flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl">
          <div className="flex flex-col w-full relative">
            <input
              onChange={(e) => setInputValueFromInput(e.target.value)}
              className="w-full bg-transparent border-none text-white focus:outline-none text-2xl "
              type="text"
              value={citySearchInput}
              placeholder="City"
            ></input>
            <div className="bg-transparent  text-white focus:outline-none text-2xl ">
              {availableCities.map((city, index) => {
                return (
                  <div
                    className="border-t-2 cursor-pointer"
                    onClick={() => setInputValueFromList(city)}
                    key={index}
                  >{`${city.name},${city.country}`}</div>
                );
              })}
            </div>
          </div>
          <div>
            <button
              onClick={() => onCitySelect(selectedCity)}
              className="cursor-pointer text-lg p-3 absolute top-0 right-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CitySearch;
