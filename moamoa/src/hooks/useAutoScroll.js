import { useEffect } from "react";

// 자동 스크롤
const useAutoScroll = (ref, dependency) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dependency]);
};

export default useAutoScroll;
