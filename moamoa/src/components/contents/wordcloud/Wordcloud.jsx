import React from "react";
import "./Wordcloud.scss";

const Wordcloud = () => {
  return (
    <div className="wordcloud-zip">
      <div className="wordcloud-zip__header">
        <span className="wordcloud-zip__title">아카이브 보드</span>
      </div>

      <div className="wordcloud-zip__content">
        {/* 워드클라우드 보일 공간 */}
        <div className="wordcloud-zip__words"></div>
      </div>
    </div>
  );
};

export default Wordcloud;
