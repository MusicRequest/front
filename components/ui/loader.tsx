import * as React from "react";
import { LineWave } from "react-loader-spinner";

const Loader = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(() => (
  <LineWave
    visible={true}
    height="100"
    width="100"
    color="#4fa94d"
    ariaLabel="line-wave-loading"
    wrapperStyle={{}}
    wrapperClass=""
    firstLineColor=""
    middleLineColor=""
    lastLineColor=""
  />
));
Loader.displayName = "Loader";

export { Loader };
