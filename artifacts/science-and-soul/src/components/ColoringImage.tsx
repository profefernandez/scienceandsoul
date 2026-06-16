import { useEffect, useRef } from "react";

interface ColoringImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: "eager" | "lazy";
  className?: string;
  fit?: boolean;
}

export function ColoringImage({
  src,
  alt,
  width,
  height,
  loading = "lazy",
  className = "",
  fit = false,
}: ColoringImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mask = document.createElement("canvas");
    const maskCtx = mask.getContext("2d");
    if (!maskCtx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const colorImg = new Image();
    let loaded = false;
    let raf = 0;

    function drawCover(
      c: CanvasRenderingContext2D,
      img: HTMLImageElement,
      dw: number,
      dh: number,
    ) {
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!iw || !ih) return;
      const ir = iw / ih;
      const dr = dw / dh;
      let sx = 0;
      let sy = 0;
      let sw = iw;
      let sh = ih;
      if (ir > dr) {
        sw = ih * dr;
        sx = (iw - sw) / 2;
      } else {
        sh = iw / dr;
        sy = (ih - sh) / 2;
      }
      c.drawImage(img, sx, sy, sw, sh, 0, 0, dw, dh);
    }

    function recomposite() {
      if (!loaded || !ctx || !canvas) return;
      const cw = canvas.width;
      const ch = canvas.height;
      if (!cw || !ch) return;
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, cw, ch);
      drawCover(ctx, colorImg, cw, ch);
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(mask, 0, 0);
      ctx.globalCompositeOperation = "source-over";
    }

    function resize() {
      if (!wrap || !canvas) return;
      const rect = wrap.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const cw = Math.round(rect.width * dpr);
      const ch = Math.round(rect.height * dpr);
      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw;
        canvas.height = ch;
        mask.width = cw;
        mask.height = ch;
      }
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      recomposite();
    }

    function stamp(xCss: number, yCss: number) {
      if (!maskCtx || !canvas) return;
      const x = xCss * dpr;
      const y = yCss * dpr;
      const base = Math.min(canvas.width, canvas.height);
      const r = Math.max(40 * dpr, base * 0.16);
      const g = maskCtx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.55, "rgba(255,255,255,0.95)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      maskCtx.fillStyle = g;
      maskCtx.beginPath();
      maskCtx.arc(x, y, r, 0, Math.PI * 2);
      maskCtx.fill();
    }

    function schedule() {
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          recomposite();
        });
      }
    }

    function onMove(e: PointerEvent) {
      if (e.pointerType === "touch" || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      stamp(e.clientX - rect.left, e.clientY - rect.top);
      schedule();
    }

    colorImg.onload = () => {
      loaded = true;
      resize();
    };
    colorImg.src = src;
    if (colorImg.complete && colorImg.naturalWidth) {
      loaded = true;
    }

    resize();

    const ro = new ResizeObserver(() => resize());
    ro.observe(wrap);

    wrap.addEventListener("pointermove", onMove);

    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (!en.isIntersecting && en.boundingClientRect.top < 0) {
            wrap.classList.add("is-revealed");
          }
        }
      },
      { threshold: 0 },
    );
    io.observe(wrap);

    return () => {
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [src]);

  const cls = ["colimg", fit ? "colimg-fit" : "", className].filter(Boolean).join(" ");

  return (
    <div className={cls} ref={wrapRef}>
      <img className="colimg-base" src={src} alt={alt} width={width} height={height} loading={loading} />
      <canvas className="colimg-canvas" ref={canvasRef} aria-hidden="true" />
      <img className="colimg-full" src={src} alt="" aria-hidden="true" loading={loading} />
    </div>
  );
}
