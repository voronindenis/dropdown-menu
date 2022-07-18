import * as React from 'react';
import { createPortal } from 'react-dom';

import { useIntersectionObserver, useRect } from '../../hooks';
import './Popper.css';

export interface IPopper<T extends Element> {
  anchorRef: React.RefObject<T>;
}

export const Popper = <T extends Element>(props: React.PropsWithChildren<IPopper<T>>) => {
  const { anchorRef, children } = props;

  const [isOpen, setOpen] = React.useState(false);
  const anchorRect = useRect<T>(anchorRef);

  const element = React.useMemo(() => {
    const el = document.createElement("div");
    el.classList.add('popper');
    return el;
  }, []);

  const popperRect = useRect<T>(element);

  React.useLayoutEffect(() => {
    if (anchorRef.current) {
      anchorRef.current.appendChild(element);
    }
  }, [anchorRef, element]);

  React.useLayoutEffect(() => {
    if (isOpen) {
      element.classList.add('opened');
      const popperPosition = [
        anchorRect && popperRect && (window.innerHeight - anchorRect.bottom) > popperRect.height && (window.innerWidth - anchorRect.right) > popperRect.width && 'bottom-right',
        anchorRect && popperRect && (window.innerHeight - anchorRect.bottom) > popperRect.height && (window.innerWidth - anchorRect.right) < popperRect.width && 'bottom-left',
        anchorRect && popperRect && (window.innerHeight - anchorRect.bottom) < popperRect.height && (window.innerWidth - anchorRect.right) > popperRect.width && 'top-right',
        anchorRect && popperRect && (window.innerHeight - anchorRect.bottom) < popperRect.height && (window.innerWidth - anchorRect.right) < popperRect.width && 'top-left',
      ].filter<string>((value): value is string => typeof value === 'string')[0] || '';
      if (popperPosition === 'bottom-right') {
        element.style.top = '';
        element.style.left = '';
      }
      if (popperPosition === 'bottom-left') {
        element.style.top = '';
        element.style.left = `-${(popperRect?.width || 0) - (anchorRect?.width || 0)}px`;
      }
      if (popperPosition === 'top-right') {
        element.style.top = `${-(anchorRect?.height || 0) - (popperRect?.height || 0)}px`;
        element.style.left = '';
      }
      if (popperPosition === 'top-left') {
        element.style.top = `${-(anchorRect?.height || 0) - (popperRect?.height || 0)}px`;
        element.style.left = `-${(popperRect?.width || 0) - (anchorRect?.width || 0)}px`;
      }
    } else {
      element.classList.remove('opened')
      element.style.top = '';
      element.style.left = '';
    }
  }, [isOpen, anchorRect]); // eslint-disable-line react-hooks/exhaustive-deps

  useIntersectionObserver(element, ([entry]) => {
    if (!entry.isIntersecting) {
      setOpen(false);
    }
  }, { threshold: 0.01 });

  const clickListener = React.useCallback((event: MouseEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      setOpen(!isOpen);
    } else {
      setOpen(false);
    }
  }, [anchorRef, isOpen]);

  React.useEffect(() => {
    document.addEventListener('click', clickListener, true);
    return () => {
      document.removeEventListener('click', clickListener, true);
    };
  }, [clickListener]);

  return createPortal(
    children,
    element,
  );
};
