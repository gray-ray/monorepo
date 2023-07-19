import React, { useRef } from "react";

import { Col, Row } from "antd";
import Board from "./Board";
// 实现实时画板
const Index: React.FC = () => {
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
