/* eslint-disable no-console */
/* eslint-disable eqeqeq */
import React from "react";
import { buildImgUrl } from "../config";
import Icon from "./Icon";
import Spinner from "./Spinner";
import useImagePrediction from "../hooks/useImagePrediction";

const ScrolledImage = ({ imageId }) => {
  const { isLoading, gunPos, knifePos, scisPos, pliPos, wrePos, isSus } =
    useImagePrediction(imageId);

  return (
    <div className={`image-container ${isSus ? "active" : ""}`}>
      <a href={`/view/${imageId}`}>
        <img src={buildImgUrl(imageId)} alt="" className="scroll-image" />
      </a>
      {isLoading && <Spinner />}
      <div className="icons-container">
        {gunPos && <Icon type="gun" className="icon" />}
        {wrePos && <Icon type="wrench" className="icon" />}
        {pliPos && <Icon type="pliers" className="icon" />}
        {scisPos && <Icon type="scissors" className="icon" />}
        {knifePos && <Icon type="knife" className="icon" />}
      </div>
    </div>
  );
};

export default ScrolledImage;
