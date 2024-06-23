import "./style.scss";
import { useEffect, useRef } from "react";
import { useViewer } from "../../hooks/useViewer.ts";
import shader from "../../shaders/test.glsl";
import vertexShader from "../../shaders/test-vertex.glsl";

export const Test = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const [viewer] = useViewer(
    canvasRef.current,
    wrapRef.current,
    shader,
    vertexShader,
  );

  useEffect(() => {
    if (!viewer) return;
  }, [viewer]);

  return (
    <div className={"text-page example-page"} ref={wrapRef}>
      <canvas ref={canvasRef} className={"example-canvas"}></canvas>
    </div>
  );
};
