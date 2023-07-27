import React, { useRef } from "react";

import { Col, Row, Button } from "antd";
import Board from "./Board";
import  { useInterval } from '@packages/react-hooks-set';
// 实现实时画板
const Index: React.FC = () => {
  const { seconds, startCount, disabled } = useInterval({ distance: 8 })
  const boardRef1 = useRef<any>(null);
  const boardRef2 = useRef<any>(null);
  const handlePost1to2 = (data: any) => {
    boardRef2?.current?.show(data);
  };
  const handlePost2to1 = (data: any) => {
    boardRef1?.current?.show(data);
  };

  return (
    <div>
      <Button onClick={() => startCount()} type="primary" size="small" disabled={disabled} style={{marginBottom: 12}}>{seconds}</Button>
      <Row gutter={12}>
        <Col span={12}>
          <Board postFn={handlePost1to2} ref={boardRef1} />
        </Col>
        <Col span={12}>
          <Board postFn={handlePost2to1} ref={boardRef2} />
        </Col>
      </Row>
    </div>
  );
};
export default Index;
