export const BASE_IMAGE_URL =
  "https://eli-did-assets.s3.amazonaws.com/dataset/JPEGImage";
export const BASE_BACKEND_URL = "http://rg.eli-goldberg.com:8082";
export const buildImgUrl = (id) => `${BASE_IMAGE_URL}/${id}.jpg`;
export const backendUrl = (path) => `${BASE_BACKEND_URL}/${path}`;
// "https://eli-did-assets.s3.amazonaws.com/dataset/JPEGImage/N0876216.jpg"
