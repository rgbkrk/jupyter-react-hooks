import { useState, useEffect } from "react";

import { Observable } from "rxjs";

export const useObservable = <T>(
  observable$: Observable<T>,
  initialValue?: T
): T | undefined => {
  const [value, update] = useState<T | undefined>(initialValue);

  useEffect(() => {
    const s = observable$.subscribe(update);
    return () => s.unsubscribe();
  }, [observable$]);

  return value;
};
