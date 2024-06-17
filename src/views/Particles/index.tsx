import "./style.scss";
import { useEffect, useRef } from "react";

type Coords2D = {
  x?: number;
  y?: number;
};

function getRandomInt(min: number, max: number) {
  return Math.round(Math.random() * (max - min)) + min;
}

function easeOut(x: number) {
  return 1 - Math.pow(1 - x, 4);
}

const rgb: string[] = [
  "rgb(26, 188, 156)",
  "rgb(46, 204, 113)",
  "rgb(52, 152, 219)",
  "rgb(155, 89, 182)",
  "rgb(241, 196, 15)",
  "rgb(230, 126, 34)",
  "rgb(231, 126, 34)",
];

export const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    class Ball {
      x: number;
      y: number;
      size: number;
      style: string;

      start: {
        x: number;
        y: number;
        size: number;
      };

      end: {
        x: number;
        y: number;
      };

      time = 0;
      ttl = 40;
      constructor(x: number, y: number) {
        this.start = {
          x: x + getRandomInt(-20, 20),
          y: y + getRandomInt(-20, 20),
          size: getRandomInt(5, 20),
        };

        this.end = {
          x: this.start.x + getRandomInt(-300, 300),
          y: this.start.y + getRandomInt(-300, 300),
        };
        this.x = this.start.x;
        this.y = this.start.y;
        this.size = this.start.size;
        this.style = rgb[getRandomInt(0, rgb.length)];
      }
      draw() {
        if (!ctx) return;
        this.update();
        if (!this.size) return;
        ctx.fillStyle = this.style;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        if (this.time <= this.ttl) {
          const pr = (this.ttl - this.time) / this.ttl;

          this.size = this.start.size * easeOut(pr);
          this.x = this.x + (this.end.x - this.x) * 0.01;
          this.y = this.y + (this.end.y - this.y) * 0.01;
        }
        this.time++;
      }
    }

    let h: number = 0,
      w: number = 0,
      balls: Ball[] = [];

    let mouse: Coords2D = {
      x: undefined,
      y: undefined,
    };

    const resize = () => {
      h = canvas.height = window.innerHeight;
      w = canvas.width = window.innerWidth;
    };
    const init = () => {
      resize();
      anim();
    };

    const mousemove = ({ x, y }: MouseEvent, out = false) => {
      mouse = out ? { x: undefined, y: undefined } : { x, y };
      if (out) return;
      if (mouse.y && mouse.x) balls.push(new Ball(mouse.x, mouse.y));
    };
    const mouseout = (e: MouseEvent) => mousemove(e, true);

    function drawBalls() {
      balls.forEach((ball) => {
        ball.draw();
      });
    }

    let animation: number;

    function anim() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      const temp: Ball[] = [];

      balls.forEach((ball) => {
        if (ball.time <= ball.ttl) temp.push(ball);
      });

      balls = temp;

      drawBalls();
      animation = requestAnimationFrame(anim);
    }
    init();

    // window.addEventListener("load", init);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseout", mouseout);

    return () => {
      // window.removeEventListener("load", init);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseout", mouseout);
      if (animation) cancelAnimationFrame(animation);
    };
  }, []);

  return (
    <div className={"particles-example example-page"}>
      <canvas className={"example-canvas"} ref={canvasRef}></canvas>
    </div>
  );
};
