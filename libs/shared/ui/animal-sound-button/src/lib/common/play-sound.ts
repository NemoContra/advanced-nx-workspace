import { Observable } from 'rxjs';

export const playSound = (src: string): Observable<void> => {
  return new Observable(() => {
    const audio = new Audio(src);
    audio.play();
    return () => audio.pause();
  });
};
