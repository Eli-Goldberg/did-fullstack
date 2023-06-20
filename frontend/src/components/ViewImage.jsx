import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { buildImgUrl } from "../config";
import "./ViewImage.css";
import Spinner from "./Spinner";
import useImagePrediction from "../hooks/useImagePrediction";
import { PredictionWrapper, PredictionData } from "./Prediction";

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
