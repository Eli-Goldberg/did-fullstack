import React from "react";
import styled from "styled-components";

export const PredictionWrapper = styled.div`
  margin-top: 20px;
`;

export const ItemsWrapper = styled.div`
  color: red;
`;

export const PredictionData = ({ data }) => {
  const { isLoading, gunPos, knifePos, scisPos, pliPos, wrePos, isSus } = data;
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
