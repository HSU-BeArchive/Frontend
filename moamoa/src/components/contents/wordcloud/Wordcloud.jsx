import React, { useRef, useState, useEffect } from "react";
import "./Wordcloud.scss";
import WordCloud from "react-d3-cloud";

// 조건에 따라 색상 설정
const getColor = (word) => {
  if (word.value > 10) return "#66B2FE"; // 매우 큰 값
  if (word.value > 7) return "#AFE56C"; // 큰 값
  if (word.value > 5) return "#F7E789"; // 중간 값
  if (word.value > 3) return "#FFC59C"; // 작은 값
  return "#9D9D9D"; // 매우 작은 값
};

// 폰트 크기 설정
const fontSizeMapper = (word) => {
  const minFontSize = 10;
  const maxFontSize = 100;
  const scale = Math.log2(word.value + 1) * 18;
  return Math.max(minFontSize, Math.min(scale, maxFontSize));
};

const Wordcloud = ({ keywords }) => {
  const containerRef = useRef();
  const [size, setSize] = useState({ width: 1392, height: 682 });

  // 워드클라우드를 현재 컨테이너 크기에 맞춰 자동 조정
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        // 해당 DOM 요소의 실제 크기와 위치 정보를 반환
        const rect = containerRef.current.getBoundingClientRect();
        setSize({ width: rect.width, height: rect.height });
      }
    };
    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data = keywords.map((k) => ({
    text: k.keywordName,
    value: k.keywordCount,
  }));

  return (
    <div className="wordcloud-zip">
      <div className="wordcloud-zip__header">
        <span className="wordcloud-zip__title">아카이브 보드</span>
      </div>

      <div className="wordcloud-zip__content">
        {/* 워드클라우드 보일 공간 */}
        <div className="wordcloud-zip__words" ref={containerRef}>
          <WordCloud
            data={data}
            font="HakgyoansimDunggeunmisoTTF-B"
            fontSize={fontSizeMapper}
            width={size.width}
            height={size.height}
            fill={(d) => getColor(d)}
            spiral="archimedean"
            rotate={() => 0}
            padding={4}
          />
        </div>
      </div>
    </div>
  );
};

export default Wordcloud;
