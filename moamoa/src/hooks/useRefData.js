import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dummyRefs from "../data/dummyRefs.json";

// 레퍼런스 더미 데이터
const dummyData = dummyRefs;

const useRefData = () => {
  const { refId } = useParams();
  const [refData, setRefData] = useState(null);

  useEffect(() => {
    // 백과 연동 예정
    const data = dummyData.find((item) => item.refId === parseInt(refId, 10));
    setRefData(data || null);
  }, [refId]);

  return refData;
};

export default useRefData;
