import React, { useState } from "react";
import Card from "./Card";

const Search = () => {
  const [city, setCity] = useState("");
  const [weatherRes, setWeatherRes] = useState("");
  const [coordinateResult, setCoordinateResult] = useState("");

  let weatherResult = "";

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_URL2 = "http://api.openweathermap.org/geo/1.0/direct";
  const API_Key = "55040a977cbc605fb71e1b763429876e";

  const getWeather = async () => {
    try {
      const resultCoordinate = await fetch(
        `${API_URL2}?q=${city}&appid=${API_Key}`
      );
      const coordinateResult = await resultCoordinate.json();
      setCoordinateResult(coordinateResult[0]);
      console.log(coordinateResult[0]);

      const { lat, lon } = coordinateResult[0];

      const result = await fetch(
        `${API_URL}?lat=${lat}&lon=${lon}&appid=${API_Key}&units=metric`
      );
      const weatherResult = await result.json();
      console.log(weatherResult);

      setWeatherRes(weatherResult);
    } catch (err) {
      setWeatherRes("");
      console.error(err);
    }
  };

  const handleChange = (evt) => {
    setCity(evt.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(city);
    getWeather();
    setCity("");
  };

  return (
    <div className=" text-center ">
      <form
        onSubmit={handleSubmit}
        className=" bg-gradient-to-r from-rose-800 to-purple-900  flex justify-center border-b-2"
      >
        <div className="m-4 bg-white rounded-full cursor-pointer">
          <input
            className="outline-none p-3 rounded-full pl-6 w-96 placeholder:text-xl font-semibold"
            placeholder="Enter City Name"
            value={city}
            required
            onChange={handleChange}
          />
        </div>
        <button className="bg-white my-4 px-4 py-2 text-xl font-semibold rounded-full text-gray-400 hover:shadow-xl  shadow-black hover:bg-purple-800 hover:border-white hover:text-white transition">
          Search
        </button>
      </form>
      <Card weatherRes={weatherRes} coordinateResult={coordinateResult} />
    </div>
  );
};

export default Search;
