import { useRef, useEffect } from 'react';

const useDoubleClick = ({
  singleClick,
  doubleClick,
  delay = 250,
}) => {
  const clickAmount = useRef(0);
  const timer = useRef(null);

  useEffect(() => (
    () => {
      if (timer) {
        clearTimeout(timer.current);
      }
    }
  ),
  []);

  const onClick = (event) => {
    clickAmount.current += 1;
    if (timer.current) {
      return;
    }
    timer.current = setTimeout(() => {
      if (clickAmount.current >= 2) {
        doubleClick(event);
      } else {
        singleClick(event);
      }
      clickAmount.current = 0;
      timer.current = null;
    }, delay);
  };

  return onClick;
};

export default useDoubleClick;
