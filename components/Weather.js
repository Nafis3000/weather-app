import React, { useEffect } from "react";
import Image from "next/image";

export const Weather = () => {
  const [city, setCity] = React.useState("Saskatoon");
  const [cityValue, setCityValue] = React.useState("Saskatoon");
  const [temp, setTemp] = React.useState(0);
  const [humidity, setHumidity] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [speed, setSpeed] = React.useState(0);
  const [icon, setIcon] = React.useState("");

  const location = {
    apiKey: "bb8ba865a2d9d7b6a3c5284ed679a08f",
    fetchCity: function (c) {
      fetch(
        "http://api.openweathermap.org/geo/1.0/direct?q=" +
          c +
          "&limit=1&appid=" +
          this.apiKey
      )
        .then((response) => response.json())
        .then((data) => this.getLocation(data))
        .catch(() => {
          setCity("Not Found");
        });
    },
    getLocation: function (data) {
      const lat = data[0].lat;
      const lon = data[0].lon;
      this.fetchWeather(lat, lon);
    },
    fetchWeather: function (latty, lonny) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
          latty +
          "&lon=" +
          lonny +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    //set the name, temperature, humidity, and weather description
    displayWeather: function (data) {
      setTemp(data.main.temp);
      setHumidity(data.main.humidity);
      setDescription(data.weather[0].description);
      setSpeed(data.wind.speed);
      setIcon(data.weather[0].icon);
    },
  };

  useEffect(() => {
    location.fetchCity(city);
  }, [city]);

  const handleChange = (e) => {
    setCityValue(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setCity(cityValue);
    }
  };

  function notEmptyStr() {
    if (city == "" || city == null) {
      setCity("Saskatoon");
    }
  }

  notEmptyStr();

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <img
          src={"https://source.unsplash.com/random/?" + city}
          className="absolute object-cover w-full h-full"
        />

        <div className="bg-neutral-200 text-black p-10 flex flex-col justify-between absolute shadow-2xl rounded">
          <input
            type="text"
            onChange={handleChange}
            onKeyDown={handleEnter}
            className="rounded shadow py-1 pl-1"
            placeholder="Enter a city"
          />
          <button
            className="bg-blue-400 hover:bg-blue-300 text-gray-800 my-2 border border-gray-500 rounded shadow "
            onClick={() => setCity(cityValue)}
          >
            Search
          </button>
          <h1 className="py-2 text-2xl capitalize">{city}</h1>
          <h2 className="text-xl">{Math.round(temp)}°C</h2>
          <div className="inline-flex">
            <span className="capitalize justify-center self-center">
              {description}
            </span>
            <img src={"http://openweathermap.org/img/wn/" + icon + ".png"} />
          </div>
          <p>Humidity: {humidity}%</p>
          <p>Wind Speed: {speed}km/h</p>
        </div>
      </div>
    </>
  );
};
