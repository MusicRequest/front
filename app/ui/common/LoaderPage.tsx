import React from "react";
import { FiLoader } from "react-icons/fi";

type Props = {};

const LoaderPage = (props: Props) => {
  return (
    <div className="w-full h-screen justify-center items-center flex flex-col">
      <FiLoader size={42} className="animate-spin" />
      <h2 className="animate-pulse">Chargement</h2>
    </div>
  );
};

export default LoaderPage;
