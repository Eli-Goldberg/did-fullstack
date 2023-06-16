/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable eqeqeq */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from "react";
import "./ImageScroller.css";
import { useQuery } from "react-query";
import { buildImgUrl } from "../../config";
import Icon from "../Icon";
import { getImagePrediction } from "../../backend";

// const checkedImageIds = new Set();
const isPositive = (val) => val == "1.0";

const Image = ({ imageId }) => {
  const [state, setState] = useState({
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
      console.error(`Image ${imageId} is no ok`);
    }

    if (data?.prediction) {
      const { gun, knife, scissors, pliers, wrench } = data.prediction;
      const allPos = [gun, knife, scissors, pliers, wrench].map(isPositive);
      const [gunPos, knifePos, scisPos, pliPos, wrePos] = allPos;

      const isSus = allPos.some((i) => i);
      setState({ isSus, gunPos, scisPos, pliPos, wrePos, knifePos });
    }
  }, [data, error, isLoading]);

  const { gunPos, knifePos, scisPos, pliPos, wrePos, isSus } = state;

  return (
    <div className={`image-container ${isSus ? "active" : ""}`}>
      <div className="id-container">{imageId}</div>
      <img src={buildImgUrl(imageId)} alt="" className="scroll-image" />
      {isLoading && <div className="spinner" />}
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

const ImageScroller = ({ imageIds }) => {
  const newImageIds = imageIds.concat(imageIds);

  return (
    <div id="scroller" className="scroller">
      <div className="inner">
        {newImageIds.map((imageId, index) => (
          <Image key={`${imageId}-${index}`} imageId={imageId} />
        ))}
      </div>
    </div>
  );
};

export default ImageScroller;
