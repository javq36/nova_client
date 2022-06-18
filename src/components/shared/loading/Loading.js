import React from "react";
import { ThreeDots } from "react-loader-spinner";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export const Loading = () => {
  return <ClipLoader color={"##2c3265"} /* css={override} */ size={150} loading={true} />;
};
