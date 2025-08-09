export const LOGO_URL = "../../public/logo.png";

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";

export const USER_ICON =
  "https://th.bing.com/th/id/OIP.kYYbdJhBIh1SEi8MKTPYpgHaHa?rs=1&pid=ImgDetMain";

export const BACKGROUND_IMAGE_URL = "/background.jpg";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_MOVIE_API_KEY,
  },
};

export const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;
