import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import DocCollection, { BaseDoc } from "../framework/doc";
import { NotAllowedError } from "./errors";

dotenv.config();

// export interface WeatherDoc extends BaseDoc {
//   user: ObjectId;
//   recipient: ObjectId;
//   weather: string;
// }

export interface WeatherShareDoc extends BaseDoc {
  user: ObjectId;
  agreed: boolean;
  city?: string;
  state?: string;
}

/**
 * concept: Weathering [User, Weather]
 */
export default class WeatheringConcept {
  //   public readonly weathers: DocCollection<WeatherDoc>;
  public readonly shares: DocCollection<WeatherShareDoc>;

  constructor(collectionName: string) {
    // this.weathers = new DocCollection<WeatherDoc>(collectionName);
    this.shares = new DocCollection<WeatherShareDoc>(collectionName);
  }

  // Allow a user to turn on sharing
  async turnOnShare(user: ObjectId, city: string, state: string) {
    if (!city || !state) {
      throw new Error("Both city and state are required to turn on weather sharing.");
    }
    const existingShare = await this.shares.readOne({ user });
    const weatherInfo = { city, state, agreed: true };

    if (existingShare) {
      await this.shares.partialUpdateOne({ user }, weatherInfo);
    } else {
      await this.shares.createOne({ user, ...weatherInfo });
    }

    return { msg: "Sharing is now on.", location: weatherInfo };
  }

  // Allow a user to turn off sharing
  async turnOffShare(user: ObjectId) {
    const existingShare = await this.shares.readOne({ user });

    if (existingShare && !existingShare.agreed) {
      return { msg: "Sharing is already off." };
    }

    if (existingShare) {
      await this.shares.partialUpdateOne({ user }, { agreed: false });
    } else {
      await this.shares.createOne({ user, agreed: false });
    }

    return { msg: "Sharing is now off." };
  }

  // Check if both users have agreed to share
  async checkBothAgreeToShare(user: ObjectId, recipient: ObjectId) {
    const userShare = await this.shares.readOne({ user });
    const recipientShare = await this.shares.readOne({ user: recipient });

    return userShare?.agreed && recipientShare?.agreed;
  }

  async fetchWeather(city: string, state: string) {
    const weatherApiKey = process.env.WEATHER_API_KEY;
    const location = `${city},${state}`;
    const weatherApiUrl = `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${location}&_=${new Date().getTime()}`;

    const response = await fetch(weatherApiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const weatherData = await response.json();
    if (!weatherData.location) {
      throw new Error("Location not found. Please provide a valid city and state.");
    }
    return weatherData;
  }

  // Get the weather for both users
  async getWeathers(user: ObjectId, recipient: ObjectId, userName: string, recipientName: string) {
    const bothAgree = await this.checkBothAgreeToShare(user, recipient);
    if (!bothAgree) {
      throw new NotAllowedError("Both users must agree to share.");
    }

    const userShare = await this.shares.readOne({ user });
    const recipientShare = await this.shares.readOne({ user: recipient });

    if (!userShare || !recipientShare) {
      throw new NotAllowedError("One or both users have not enabled sharing.");
    }

    if (!userShare.city || !userShare.state) {
      throw new NotAllowedError("You need to provide both city and state to share weather.");
    }

    if (!recipientShare.city || !recipientShare.state) {
      throw new NotAllowedError(`${recipientName} needs to provide both city and state to share weather.`);
    }

    const userWeather = await this.fetchWeather(userShare.city, userShare.state);
    const recipientWeather = await this.fetchWeather(recipientShare.city, recipientShare.state);

    return {
      [userName]: {
        location: `${userWeather.location.name}, ${userWeather.location.region}`,
        temp_celsius: userWeather.current.temp_c,
        temp_fahrenheit: userWeather.current.temp_f,
        condition: userWeather.current.condition.text,
      },
      [recipientName]: {
        location: `${recipientWeather.location.name}, ${recipientWeather.location.region}`,
        temp_celsius: recipientWeather.current.temp_c,
        temp_fahrenheit: recipientWeather.current.temp_f,
        condition: recipientWeather.current.condition.text,
      },
    };
  }
}
