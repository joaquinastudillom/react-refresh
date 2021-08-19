import axios from "axios";

export default axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: "Client-ID QTRkh4eNUpkM4CPxE41G0VqWzK1XfNdzvnSDubtP9BY",
  },
});
