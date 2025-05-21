import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// 레퍼런스 더미 데이터
const dummyData = [
  {
    refId: "1",
    name: "첫 번째 레퍼런스",
    description: "샘플 아이디어 메모 입니다.",
    img: "https://cdn.ibos.kr/design/upload_file/__HTMLEDITOR__/R1SH3ptwLb/gilq3oun68tik6r1ngf6c4vbm5_15450240142275.jpg",
  },
  {
    refId: "2",
    name: "일이삼사오",
    description: "샘플 아이디어 두 번째 메모입니다.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjX7JcVk2nyFvJeCor2mBU64nRGgnuoJaDYQ&s",
  },
];

const useRefData = () => {
  const { refId } = useParams();
  const [refData, setRefData] = useState(null);

  useEffect(() => {
    // 백과 연동 예정
    const data = dummyData.find((item) => item.refId === refId);
    setRefData(data || null);
  }, [refId]);

  return refData;
};

export default useRefData;
