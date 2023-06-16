/* eslint-disable no-unused-vars */
import { backendUrl } from "./config";

// Fetcher function
export const getRandomImages = async ({ queryKey }) => {
  const [_, count] = queryKey;
  const res = await fetch(backendUrl(`api/v1/images/random/${count}`));
  return res.json();
};

export const getImagePrediction = async ({ queryKey }) => {
  const [_, imageId] = queryKey;
  const res = await fetch(backendUrl(`api/v1/images/predict/${imageId}`));
  return res.json();
};
