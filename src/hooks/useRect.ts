import * as React from 'react';

const useEffectInEvent = (event: 'resize' | 'scroll', useCapture: boolean, set: () => void ) => {
  React.useEffect(() => {
    set();
    window.addEventListener(event, set, useCapture);
    return () => window.removeEventListener(event, set, useCapture);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export const useRect = <T extends Element>(refOrElement: React.RefObject<T> | Element): DOMRect | undefined => {
  const [rect, setRect] = React.useState<DOMRect>();

  const set = () => setRect('getBoundingClientRect' in refOrElement ? refOrElement.getBoundingClientRect() : refOrElement.current?.getBoundingClientRect());

  useEffectInEvent('resize', false, set);
  useEffectInEvent('scroll', true, set);

  return rect;
};
