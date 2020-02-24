import axios from "axios";

export class CarService {
  getCarsSmall() {
    return axios.get("./Data.json").then(res => res.data);
  }
}
