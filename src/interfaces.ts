interface WeatherApiResponse{
  location: Location;
  current: Current;
}
interface Location {
  name: string;
  country: string;
  lat: number;
  lon: number;
  localtime: string;
  localtime_epoch: number;
  tz_id: string;
}
interface Current extends Condition {
  temp_c: number;
  wind_kph: number;
  humidity: number;
  cloud: number;
  vis_km: number
}

interface WeatherForecastResponse extends WeatherApiResponse {
  forecast: {
    forecastday: DailyForecast[];
  };
}
interface DailyForecast {
  date: string;
  day: DayOverview;
  hour: HourlyForecast[];
}
interface DayOverview extends Condition {
  avgtemp_c: number;
  avghumidity: number;
  daily_chance_of_rain: number;
}
interface HourlyForecast {
  time: string;
  temp_c: number;
  wind_kph: number;
  humidity: number;
  cloud: number;
  precip_mm: number;
  uv: number;
}
interface Condition {
  condition: {
    text: string;
    icon: string;
  }
}

// renaming to display labels on graph
function parse(hourlyData: HourlyForecast[]) {
  const output: ProcessedHourlyForecast[] = []

  for (const h of hourlyData) {
    // only "processing" is date string shortened to 24-hour
    const result = (() => {
      return {
        "hour": h.time.slice(-5),
        "temperature_c": h.temp_c,
        "wind_kph": h.wind_kph,
        "humidity": h.humidity,
        "cloud_cover": h.humidity,
        "rain_mm": h.precip_mm,
        "uv_index": h.uv,
      }  
    })();
    output.push(result)
  }

  return output
}

interface ProcessedHourlyForecast {
  hour: string;
  temperature_c: number;
  wind_kph: number;
  humidity: number;
  cloud_cover: number;
  rain_mm: number;
  uv_index: number;
}

export { WeatherApiResponse, WeatherForecastResponse, HourlyForecast, parse }