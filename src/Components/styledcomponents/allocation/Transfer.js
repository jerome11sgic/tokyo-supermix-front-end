import styled from "styled-components";
import RightArrow from "../../../assets/transfer/next.png";
import LeftArrow from "../../../assets/transfer/back.png";
import DoubleRightArrow from "../../../assets/transfer/transferall.png";
import DoubleLeftArrow from "../../../assets/transfer/transferall.png";

const TransferWrapper = styled.div`
  height: 350px;
  width: 800px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const BeforeTransfer = styled.div`
  background: white;
  height: auto;
  width: 250px;
`;

const AfterTransfer = styled.div`
  background: white;
  height: auto;
  width: 250px;
`;

const ArrowArea = styled.div`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const TranferArrowArea = styled.div`
  height: 50px;
  width: 50px;
  padding: 14px;
  background-color: white;
  cursor: pointer;
  border-radius: 15px;
`;

const TranferArrow = styled.div`
  height: 25px;
  width: 25px;
  background: url(${RightArrow});
  background-size: cover;
  opacity: 0.85;
`;

const UndoTranferArrowArea = styled.div`
  height: 50px;
  width: 50px;
  padding: 12px;
  background-color: white;
  cursor: pointer;
  border-radius: 15px;
`;

const UndoTranferArrow = styled.div`
  height: 25px;
  width: 25px;
  background: url(${LeftArrow});
  background-size: cover;
  opacity: 0.85;
`;

const DoubleTranferArrowArea = styled.div`
  height: 50px;
  width: 50px;
  padding: 12px;
  background-color: white;
  cursor: pointer;
  border-radius: 15px;
`;

const DoubleTranferArrow = styled.div`
  height: 25px;
  width: 25px;
  background: url(${DoubleRightArrow});
  background-size: cover;
  opacity: 0.85;
`;

const UndoDoubleTranferArrowArea = styled.div`
  height: 50px;
  width: 50px;
  padding: 12px;
  background-color: white;
  cursor: pointer;
  border-radius: 15px;
`;

const UndoDoubleTranferArrow = styled.div`
  height: 25px;
  width: 25px;
  background: url(${DoubleLeftArrow});
  background-size: cover;
  opacity: 0.85;
`;

export {
  TransferWrapper,
  BeforeTransfer,
  AfterTransfer,
  ArrowArea,
  TranferArrowArea,
  TranferArrow,
  UndoTranferArrowArea,
  UndoTranferArrow,
  UndoDoubleTranferArrowArea,
  UndoDoubleTranferArrow,
  DoubleTranferArrowArea,
  DoubleTranferArrow
};
