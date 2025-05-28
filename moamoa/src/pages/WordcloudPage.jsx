import React from "react";
import { useLocation } from "react-router-dom";
import Wordcloud from "../components/contents/wordcloud/Wordcloud";

const WordcloudPage = () => {
  const location = useLocation();
  const keywords = location.state?.keywords;

  return (
    <div>
      <Wordcloud keywords={keywords} />
    </div>
  );
};

export default WordcloudPage;
