import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { buildImgUrl } from "../config";
import "./ViewImage.css";
import Spinner from "./Spinner";
import useImagePrediction from "../hooks/useImagePrediction";

const PredictionWrapper = styled.div`
  margin-top: 20px;
`;

const ItemsWrapper = styled.div`
  color: red;
`;

const PredictionData = ({
  data: { isLoading, gunPos, knifePos, scisPos, pliPos, wrePos, isSus },
}) => {
  if (isLoading) return "Scanning...";
  if (!isSus) return "Item is safe !";

  const items = [];
  if (gunPos) items.push("Gun");
  if (knifePos) items.push("Knife");
  if (scisPos) items.push("Scissors");
  if (pliPos) items.push("Pliers");
  if (wrePos) items.push("Wrench");

  return (
    <div>
      Dangerous items detected: <ItemsWrapper>{items.join(", ")}</ItemsWrapper>
    </div>
  );
};

const ViewImage = () => {
  const { imageId } = useParams();

  const data = useImagePrediction(imageId);
  const { isLoading } = data;

  return (
    <div className="img-wrapper">
      <img src={buildImgUrl(imageId)} alt="" />
      {isLoading ? <Spinner /> : null}
      <PredictionWrapper>
        <PredictionData data={data} />
      </PredictionWrapper>
    </div>
  );
};

export default ViewImage;
