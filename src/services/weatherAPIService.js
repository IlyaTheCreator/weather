import { v4 as uuid } from "uuid";
import { apiTypes } from "../constants";

import simpleRound from "../helpers/simpleRound";

class WeatherAPIService {
  constructor() {
    this.selectedApiType = null;
  }

  static #apisData() {
    return {
      "open-weather-map": {
        apiPath: "https://api.openweathermap.org/data/2.5/onecall",
        apiType: apiTypes.OPEN_WEATHER_MAP,
      },
      "free-weather-api": {
        apiPath: "https://api.weatherapi.com/v1/forecast.json",
        apiType: apiTypes.FREE_WEATHER_API,
      },
    };
  }

  static #apiKeys() {
    return {
      "open-weather-map": "cf33b9e5a1e26909a3ca013250b1a78c",
      "free-weather-api": "c4256c0653c74259adb84822220203",
    };
  }

  getForecast(cityName, coordinates) {
    switch (this.selectedApiType.apiType) {
      case apiTypes.OPEN_WEATHER_MAP:
        return this.openWeatherMapSearch(cityName, coordinates);
      case apiTypes.FREE_WEATHER_API:
        return this.freeWeatherApiSearch(cityName, coordinates);
      default:
        break;
    }
  }

  async openWeatherMapSearch(cityName, coordinates) {
    try {
      const [lat, lon] = coordinates;

      const forecastData = await this.fetchData(
        WeatherAPIService.#apisData()["open-weather-map"].apiPath,
        [
          { name: "lat", value: lat },
          { name: "lon", value: lon },
          {
            name: "appid",
            value: WeatherAPIService.#apiKeys()["open-weather-map"],
          },
          { name: "units", value: "metric" },
        ]
      );

      return {
        id: uuid(),
        title: cityName,
        date: new Date(),
        lat: lat,
        lon: lon,
        cityImage: "cloudy.png",
        currentTemp: simpleRound(forecastData.daily[0].temp.day),
        weatherCondition: forecastData.daily[0].weather[0].description,
        widgetRelatedInfo: this.generateWidgetRelatedInfo(
          forecastData.daily[0].temp.min,
          forecastData.daily[0].temp.max,
          forecastData.hourly[0].feels_like,
          forecastData.daily[0].uvi,
          forecastData.hourly[0].pressure,
          forecastData.hourly[0].wind_speed
        ),
      };
    } catch (e) {
      console.warn("could not fetch weather data");
      return { error: true };
    }
  }

  async freeWeatherApiSearch(cityName, coordinates) {
    try {
      const [lat, lon] = coordinates;

      const forecastData = await this.fetchData(
        WeatherAPIService.#apisData()["free-weather-api"].apiPath,
        [
          { name: "q", value: `${lat},${lon}` },
          {
            name: "key",
            value: WeatherAPIService.#apiKeys()["free-weather-api"],
          },
        ]
      );

      return {
        id: uuid(),
        title: cityName,
        date: new Date(),
        lat: lat,
        lon: lon,
        cityImage: "cloudy.png",
        currentTemp: simpleRound(forecastData.current.temp_c),
        weatherCondition:
          forecastData.forecast.forecastday[0].day.condition.text,
        widgetRelatedInfo: this.generateWidgetRelatedInfo(
          forecastData.forecast.forecastday[0].day.mintemp_c,
          forecastData.forecast.forecastday[0].day.maxtemp_c,
          forecastData.current.feelslike_c,
          forecastData.forecast.forecastday[0].day.uv,
          forecastData.current.pressure_mb,
          forecastData.current.wind_kph
        ),
      };
    } catch {
      console.warn("could not fetch weather data");
      return { error: true };
    }
  }

  async fetchData(url, params, headers = {}) {
    let urlParams = "?";

    params.forEach((param, index) => {
      urlParams += `${param.name}=${param.value}`;

      if (index !== params.length - 1) {
        urlParams += "&";
      }
    });

    const res = await fetch(url + urlParams, { headers: new Headers(headers) });

    return await res.json();
  }

  generateWidgetRelatedInfo(
    minTemp,
    maxTemp,
    feltTemp,
    uvIndicator,
    pressure,
    windSpeed
  ) {
    return {
      minTemp: {
        name: "MIN TEMP",
        value: simpleRound(minTemp) + "°",
      },
      maxTemp: {
        name: "MAX TEMP",
        value: simpleRound(maxTemp) + "°",
      },
      feltTemp: {
        name: "FEELS LIKE",
        value: simpleRound(feltTemp) + "°",
      },
      uvIndicator: {
        name: "Uv Indicator",
        value: simpleRound(uvIndicator),
      },
      pressure: {
        name: "PRESSURE",
        value: pressure + " hPa",
      },
      windSpeed: {
        name: "WIND SPEED",
        value: windSpeed + " kph",
      }, // instead of air quality
    };
  }

  getApiTypes() {
    return WeatherAPIService.#apisData();
  }

  setApiType(apiType) {
    this.selectedApiType = apiType;
  }
}

export default new WeatherAPIService();