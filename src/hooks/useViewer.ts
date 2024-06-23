import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Viewer } from "../viewer";

export const useViewer = (
  canvas?: HTMLCanvasElement | null,
  wrapper?: HTMLElement | null,
  fragmentShader?: string,
  vertexShader?: string,
) => {
  const [viewer, setViewer] = useState<Viewer | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!canvas || !ready) return;
    const v = new Viewer(canvas, wrapper, fragmentShader, vertexShader);
    setViewer(v);
    return () => v.time.clear();
  }, [ready]);
  return [viewer, setViewer] as [
    Viewer | null,
    Dispatch<SetStateAction<Viewer | null>>,
  ];
};
