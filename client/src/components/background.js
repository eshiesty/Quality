import React from "react";
import { useSelector } from "react-redux";

import { Helmet } from "react-helmet";

const Background = (props) => {
  const mode = useSelector((state) => state.visual.mode);
  // const [localDarkMode, setLocalDarkMode] = useState(true);

  const colorCode = mode === "DARK" ? "#282828" : "#fffde7";

  return (
    <div>
      <Helmet>
        <style>{`body { background-color:${colorCode} }`}</style>
      </Helmet>
    </div>
  );
};

export default Background;
