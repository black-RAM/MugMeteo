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

export { WeatherApiResponse, WeatherForecastResponse, DailyForecast }