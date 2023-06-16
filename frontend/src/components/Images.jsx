/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
// import { useQuery } from "react-query";
// import { backendUrl } from "../config";
import Image from "./Image";

export default function Images({ count = 10 }) {
  const data = {
    message: [
      "N0836779",
      "N0876216",
      "N0792748",
      "N0339456",
      "P06098",
      "P08722",
      "N0922021",
      "P05496",
      "N0383334",
      "P05988",
    ],
  };
  const isLoading = false;
  const error = false;

  // const { isLoading, isError, data, error, refetch } = useQuery(["random"], () =>
  //   axios
  //     .get(backendUrl(`api/v1/images/random/${count}`))
  //     .then((res) => res.data)
  // );

  if (isLoading) return "Loading...";

  if (error) return `An error has occurred: ${error.message}`;

  return (
    <>
      {data.message.map((id) => (
        <Image id={id} />
      ))}
    </>
  );
}
Images.propTypes = {
  count: PropTypes.number.isRequired,
};
