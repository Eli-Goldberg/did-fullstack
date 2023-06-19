/* eslint-disable no-console */
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getImagePrediction } from "../backend";

// eslint-disable-next-line eqeqeq
const isPositive = (val) => val == "1.0";

export default function useImagePrediction(imageId) {
  const [state, setState] = useState({
    isLoading: true,
    error: null,
    isSus: false,
    gunPos: false,
    wrePos: false,
    pliPos: false,
    scisPos: false,
    knifePos: false,
  });
  const { data, error, isLoading } = useQuery(
    ["imagePredictions", imageId],
    getImagePrediction
  );
  useEffect(() => {
    if (error) {
      console.error(`Image ${imageId} error: ${error}`);
    }
    if (data && data.ok === false) {
      console.error(`Image ${imageId} is not ok`);
    }

    if (data?.prediction) {
      const { gun, knife, scissors, pliers, wrench } = data.prediction;
      const allPos = [gun, knife, scissors, pliers, wrench].map(isPositive);
      const [gunPos, knifePos, scisPos, pliPos, wrePos] = allPos;

      const isSus = allPos.some((i) => i);
      setState({
        isLoading,
        error,
        isSus,
        gunPos,
        scisPos,
        pliPos,
        wrePos,
        knifePos,
      });
    }
  }, [data, error, isLoading]);

  return state;
}
