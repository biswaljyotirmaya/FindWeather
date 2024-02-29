import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

import Clouds from "../../public/cloud.png";
import snow from "../../public/snow.png";
import thunderstorm from "../../public/thunderstorm.png";
import windstorm from "../../public/windstorm.png";
import Haze from "../../public/Haze.png";
import clear_sky from "../../public/clear-sky.png";
import few_clouds from "../../public/few-clouds.png";
import overcast_clouds from "../../public/overcast_clouds.png";
import moderate_rain from "../../public/moderate_rain.png";
import heavy_rain from "../../public/heavy_rain.png";

const weatherImages = {
  "scattered clouds": Clouds,
  Snow: snow,
  Thunderstorm: thunderstorm,
  Windstorm: windstorm,
  Haze: Haze,
  "clear sky": clear_sky,
  "few clouds": few_clouds,
  "overcast clouds": overcast_clouds,
  "broken clouds": Clouds,
  "moderate rain": moderate_rain,
  "heavy rain": heavy_rain,
  mist: snow,
};

const Card = ({ weatherRes, coordinateResult }) => {
  let imageSrc = null;
  mapboxgl.accessToken =
    "pk.eyJ1IjoiZGF2aWQwNjAzIiwiYSI6ImNsdDVuMHpzZjAyOTAybHMwYWZwejV3dTYifQ.jOFdc1zYyOEZ8V8_PUWO0Q";

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(83.5097);
  const [lat, setLat] = useState(20.8606);
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    if (weatherRes && weatherRes.coord) {
      setLng(weatherRes.coord.lon);
      setLat(weatherRes.coord.lat);
    } else {
      setLng(lng);
      setLat(lat);
    }
  }, [weatherRes]);

  useEffect(() => {
    if (!mapContainer.current) return;
    console.log(name);
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  }, [lng, lat]);

  if (weatherRes && weatherRes.weather && weatherRes.weather.length > 0) {
    const description = weatherRes.weather[0].description;
    const key = Object.keys(weatherImages).find((imageKey) =>
      description.toLowerCase().includes(imageKey.toLowerCase())
    );

    if (key) {
      imageSrc = weatherImages[key];
    }
  }

  return (
    <>
      <div className={`h-[calc(100vh-80px)] flex `}>
        {weatherRes ? (
          weatherRes.cod !== 200 ? (
            <div className="h-[100%] w-1/3 bg-gradient-to-b from-rose-800 to-purple-900 flex flex-col justify-center">
              <p className="text-2xl font font-semibold text-red-400">
                {weatherRes.cod}!
              </p>
              <p className="text-2xl font font-semibold text-red-400">
                {weatherRes.message}!
              </p>
              <p className="text-3xl font font-semibold text-white">
                Find a new city
              </p>
            </div>
          ) : (
            <div className="h-[100%] w-1/3 bg-gradient-to-b from-rose-800 to-purple-900 ">
              <div className=" h-2/6 p-6">
                {imageSrc && (
                  <img src={imageSrc} className="w-full h-full" alt="" />
                )}
              </div>
              <div className="  h-1/6 flex flex-col justify-center">
                <p className="text-center my-2 text-6xl font-semibold text-orange-200">
                  {weatherRes.main.temp}
                  {"°c"}
                </p>
                <p className="text-center text-purple-400 text-4xl font-semibold">
                  {coordinateResult.name}
                </p>
              </div>

              <div className=" h-5/12 p-8 text-white text-xl  font-semibold">
                <p className="my-1  ">{weatherRes.weather[0].description}</p>
                <p className="my-1  ">
                  coord : {weatherRes.coord?.lon}° N, {weatherRes.coord?.lat}° E
                </p>
                <p className="my-1  ">
                  Max : {weatherRes.main.temp_max}°| Min :
                  {weatherRes.main.temp_min}°
                </p>
                <p className="my-1 ">
                  Feels like : {weatherRes.main.feels_like}°
                </p>
                <div className="flex justify-between mt-4 text-xl font-normal">
                  <div>
                    <p>{weatherRes.main.humidity} %</p>
                    <p>Humidity</p>
                  </div>
                  <div>
                    <p>
                      {weatherRes.wind.speed}
                      {" km/h"}
                    </p>
                    <p>Wind Speed</p>
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="h-[100%] w-1/3 bg-gradient-to-b from-rose-800 to-purple-900 ">
            <div className=" h-2/6 p-6 flex justify-center items-center text-4xl text-white">
              Try to find a city
            </div>
            <div className="  h-1/6 flex flex-col justify-center">
              <p className="text-center my-2 text-6xl font-semibold text-orange-200">
              Tmperature
              </p>
              <p className="text-center text-purple-400 text-4xl font-semibold">
                Location
              </p>
            </div>

            <div className=" h-5/12 p-8 text-white text-xl  font-semibold">
              <p className="my-1  "> Weather </p>
              <p className="my-1  ">coord : --° N, --° E</p>
              <p className="my-1  ">Max : --°| Min : --°</p>
              <p className="my-1 ">Feels like : --°</p>
              <div className="flex justify-between mt-4 text-xl font-normal">
                <div>
                  <p>-- %</p>
                  <p>Humidity</p>
                </div>
                <div>
                  <p>
                    --
                    {" km/h"}
                  </p>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={mapContainer} className=" h-full w-2/3" />
      </div>
    </>
  );
};

export default Card;
