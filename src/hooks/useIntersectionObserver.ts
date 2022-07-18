import * as React from 'react'

export const useIntersectionObserver = <T extends Element>(
  refOrElement: React.RefObject<T> | T,
  cb: IntersectionObserverCallback,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
  }: IntersectionObserverInit,
): undefined => {

  React.useEffect(() => {
    const node = 'current' in refOrElement ? refOrElement.current : refOrElement
    const hasIOSupport = !!window.IntersectionObserver

    if (!hasIOSupport || !node) return void 0

    const observerParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(cb, observerParams)

    observer.observe(node)

    return () => observer.disconnect()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refOrElement, JSON.stringify(threshold), root, rootMargin])

  return void 0
}
