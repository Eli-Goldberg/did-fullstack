import { useQuery } from "react-query";

async function fetchImage(id) {
  const res = await fetch(`API_URL/${id}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
}

export default function useFetchImage(id) {
  return useQuery(["image", id], () => fetchImage(id));
}
