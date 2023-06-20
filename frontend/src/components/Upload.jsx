/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
// Import necessary libraries and components
import React, { useState } from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import Center from "./Center";
import { backendUrl } from "../config";
import { PredictionData, PredictionWrapper } from "./Prediction";
import { transformPredictionResult } from "../hooks/useImagePrediction";

const url = backendUrl("api/v1/images/upload");

const ImageUpload = () => {
  const [state, setState] = useState({
    error: null,
    isLoading: false,
    data: null,
  });
  const { error, isLoading, data } = state;

  const getUploadParams = ({ file, _meta }) => {
    const body = new FormData();
    body.append("file", file);
    // const clientid=localStorage.getItem("client_id");
    // console.log("clientid",clientid)
    return { url, body };
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file, xhr }, status) => {
    console.log(status, meta, file); // preparing, getting_upload_params, uploading, headers_received, done
    if (["preparing", "getting_upload_params", "uploading"].includes(status)) {
      setState((currState) => ({ isLoading: true, ...currState }));
    } else if (status === "done") {
      const response = JSON.parse(xhr.response);
      setState({
        isLoading: false,
        error: response?.error,
        data: transformPredictionResult(response),
      });
    }
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
  };

  return (
    <Center style={{ width: "600px", height: "600px" }}>
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept="image/*"
        inputContent={(files, extra) =>
          extra.reject ? "Images only" : "Drag Files"
        }
        multiple={false}
        styles={{
          dropzoneReject: { borderColor: "red", backgroundColor: "#DAA" },
          inputLabel: (files, extra) => (extra.reject ? { color: "red" } : {}),
        }}
      />
      {(isLoading || data) && (
        <PredictionWrapper>
          <PredictionData data={{ isLoading, ...data }} />
        </PredictionWrapper>
      )}
    </Center>
  );
};
export default ImageUpload;
