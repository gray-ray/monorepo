import {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef
} from "react";
import { Tooltip, Tag } from "antd";
import React from "react";
import { getWeekStartEnd, getDaysArr } from '@packages/times-dayjs';

interface Props {
  postFn?: (p: any) => void;
}
let isDown = false;
let canvasHistory = [] as any;
let step = -1;
let posLast = {
  lastX: 0,
  lastY: 0
};

const Index = (props: Props, ref: any) => {
  const { postFn } = props;
  const parentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctxNode, setCtx] = useState<CanvasRenderingContext2D>();
  const [wrap, setWrap] = useState<{ width: number; height: number }>({
    width: 300,
    height: 150
  });
  const [clip, setClip] = useState(false);
  console.log(getWeekStartEnd(), getDaysArr(["2023-07-19", "2023-07-30"]))
  const backDraw = () => {
    const canvasPic = new Image();
    if (!canvasHistory.length) {
      ctxNode?.clearRect(0, 0, wrap.width, wrap.height);
      return;
    }
    canvasPic.src = canvasHistory[step];
    canvasPic.onload = () => {
      ctxNode?.clearRect(0, 0, wrap.width, wrap.height);
      ctxNode?.drawImage(canvasPic, 0, 0, wrap.width, wrap.height);
    };
  };

  const pushHistory = () => {
    const { current } = canvasRef;
    step += 1;
    if (step < canvasHistory.length) canvasHistory.length = step;
    canvasHistory.push(current?.toDataURL());
  };
  /**
   * 初始化
   */
  const init: () => void = async () => {
    const { current } = canvasRef;
    const { current: divCur } = parentRef;
    canvasHistory = [];
    // @ts-ignore
    const ctx: CanvasRenderingContext2D = current?.getContext("2d");
    // 如果在js中设置canvas的宽高会出现拉伸问题
    setWrap({ width: divCur?.offsetWidth ?? 300, height: 400 });
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.lineJoin = "round";
    setCtx(ctx);
  };

  /**
   * 链接
   * @param x
   * @param y
   * @param can
   * @returns
   */
  const handleDraw = (x = 0, y = 0, can = false) => {
    posLast = { lastX: x, lastY: y };
    if (!can) return;
    ctxNode?.lineTo(x, y);
    ctxNode?.stroke();
  };

  /**
   * 鼠标移出画布，或者鼠标弹起
   * @param e
   * @returns
   */
  const handleEnd = (e: any) => {
    e.preventDefault();
    if (!isDown) return;
    isDown = false;
    const { nativeEvent } = e;
    const { offsetX: x = 0, offsetY: y = 0 } = nativeEvent;
    const { lastX, lastY } = posLast;
    ctxNode?.quadraticCurveTo(lastX, lastY, x, y);
    ctxNode?.closePath();
    pushHistory();
    postFn?.(canvasHistory);
  };
  /**
   * 鼠标移动
   * @param e
   * @returns
   */
  const handleMove = (e: any) => {
    e.preventDefault();
    if (!isDown) return;
    const { nativeEvent } = e;
    const { offsetX: x = 0, offsetY: y = 0 } = nativeEvent;
    if (clip) {
      ctxNode?.save();
      ctxNode?.beginPath();
      (ctxNode as CanvasRenderingContext2D).fillStyle = "rgb(255, 255, 255)";
      ctxNode?.arc(x, y, 10, 0, Math.PI * 2, false);
      ctxNode?.fill();
      ctxNode?.restore();
    } else {
      handleDraw(x, y, isDown);
    }
  };
  /**
   * 鼠标按下
   * @param e
   */
  const handleMouseDown = (e: any) => {
    e.preventDefault();
    const { nativeEvent } = e;
    const { offsetX: x, offsetY: y } = nativeEvent;
    isDown = true;
    ctxNode?.beginPath();
    ctxNode?.moveTo(x, y);
    handleDraw(x, y, isDown);
  };

  /**
   * 撤回功能
   * @param e
   * @returns
   */
  const handleUndo = (e: any) => {
    e.preventDefault();
    if (!step) return;
    step -= 1;
    const canvasPic = new Image();
    canvasPic.src = canvasHistory[step];
    canvasPic.onload = () => {
      ctxNode?.clearRect(0, 0, wrap.width, wrap.height);
      ctxNode?.drawImage(canvasPic, 0, 0, wrap.width, wrap.height);
    };
    const copyData = [...canvasHistory];
    copyData.pop();
    postFn?.(copyData);
  };
  /**
   * 反撤回
   * @param e
   * @returns
   */
  const handleRedo = (e: any) => {
    e.preventDefault();
    if (step === canvasHistory?.length) return;
    step += 1;
    const canvasPic = new Image();
    canvasPic.src = canvasHistory[step];
    canvasPic.onload = () => {
      ctxNode?.clearRect(0, 0, wrap.width, wrap.height);
      ctxNode?.drawImage(canvasPic, 0, 0, wrap.width, wrap.height);
    };
    const copyData = canvasHistory.slice(0, step);
    postFn?.(copyData);
  };

  /**
   * 清空
   * @param e
   */
  const handleClearAll = (e: any) => {
    e.preventDefault();
    ctxNode?.clearRect(0, 0, wrap.width, wrap.height);
    isDown = false;
    canvasHistory = [] as any;
    step = -1;
    posLast = {
      lastX: 0,
      lastY: 0
    };
    postFn?.(canvasHistory);
  };
  const handleClear = (e: any) => {
    e.preventDefault();
    setClip((o) => !o);
  };

  /**
   * 画板功能
   */
  const boardOperation = [
    <Tag color="magenta" key="backup" onClick={handleUndo}>
      <a>撤回上一步</a>
    </Tag>,
    <Tag color="magenta" key="backNext" onClick={handleRedo}>
      <a>撤回下一步</a>
    </Tag>,
    <Tag color="magenta" key="save">
      <a>保存</a>
    </Tag>,
    <Tag color="magenta" key="clear" onClick={handleClear}>
      <a>橡皮擦</a>
    </Tag>,
    <Tag color="magenta" key="clearAll" onClick={handleClearAll}>
      <a>清空</a>
    </Tag>
  ];

  // output
  useImperativeHandle(ref, () => ({
    show: () => backDraw()
  }));
  useEffect(() => {
    init();
  }, []);

  return (
    <div ref={parentRef} style={{ width: "100%", background: "#eee" }}>
      <Tooltip placement="top" title={boardOperation}>
        <canvas
          style={{ background: "#eee" }}
          width={wrap?.width}
          height={wrap?.height}
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleEnd}
          onMouseOut={handleEnd}
          onMouseMove={handleMove}
        />
      </Tooltip>
    </div>
  );
};
export default forwardRef(Index);
