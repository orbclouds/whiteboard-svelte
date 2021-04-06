const randomInt = (
  min: number,
  max: number
): number =>
  Math.floor(
    Math.random() * (max - min + 1) +
      min
  );

export const randomColor = (): string =>
  `hsl(${randomInt(0, 360)}, 40%, 70%)`;

const draw = (
  node: HTMLCanvasElement
): { destroy(): void } => {
  const resize = () => {
    node.width =
      Math.min(
        window.innerWidth,
        1024
      ) * 0.8;
    node.height =
      window.innerHeight * 0.8;
  };

  resize();

  window.addEventListener(
    'resize',
    resize
  );

  const handlePointerDown = ({
    clientX,
    clientY,
    currentTarget,
  }: PointerEvent) => {
    const ctx = node.getContext('2d');
    if (!ctx) {
      alert(
        'Canvas is not supported in this browser!'
      );
      return;
    }

    const color = randomColor();
    document.body.style.background = color;

    const draw = (
      x: number,
      y: number
    ): void => {
      const width = 8;

      ctx.beginPath();
      ctx.arc(
        x,
        y,
        width,
        0,
        2 * Math.PI,
        false
      );
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.fill();
      ctx.stroke();
    };

    draw(
      clientX -
        node.getBoundingClientRect()
          .left,
      clientY -
        node.getBoundingClientRect().top
    );

    const handlePointerMove = ({
      clientX,
      clientY,
      currentTarget,
    }: PointerEvent) => {
      const target = currentTarget as HTMLCanvasElement;

      draw(
        clientX -
          target.getBoundingClientRect()
            .left,
        clientY -
          target.getBoundingClientRect()
            .top
      );
    };
    const handlePointerUp = () => {
      node.removeEventListener(
        'pointermove',
        handlePointerMove
      );
      document.removeEventListener(
        'pointerup',
        handlePointerUp
      );
    };

    node.addEventListener(
      'pointermove',
      handlePointerMove
    );
    document.addEventListener(
      'pointerup',
      handlePointerUp
    );
  };

  node.addEventListener(
    'pointerdown',
    handlePointerDown
  );
  return {
    destroy() {
      node.removeEventListener(
        'pointerdown',
        handlePointerDown
      );
      window.removeEventListener(
        'resize',
        resize
      );
    },
  };
};

export default draw;
