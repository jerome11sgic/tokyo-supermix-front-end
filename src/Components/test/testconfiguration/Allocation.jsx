import React, { Component } from "react";
import {
  TransferWrapper,
  BeforeTransfer,
  AfterTransfer,
  ArrowArea,
  TranferArrow,
  TranferArrowArea,
  UndoTranferArrowArea,
  UndoTranferArrow,
  DoubleTranferArrow,
  DoubleTranferArrowArea,
  UndoDoubleTranferArrowArea,
  UndoDoubleTranferArrow
} from "../../styledcomponents/allocation/Transfer";
import { FlexContainer } from "../../styledcomponents/container/FlexGrid";
import { Checkbox } from "antd";

const data = [
  {
    id: 0,
    name: "xyz"
  },
  {
    id: 1,
    name: "abc"
  },
  {
    id: 2,
    name: "jkb"
  }
];

const data1 = [];

export default class Allocation extends Component {
  onChangeCheckbox = e => {
    if (e.target.checked === false) {
      e.target.checked = true;
      console.log(e.target.checked);
    }

    if (e.target.checked === true) {
      e.target.checked = false;
      console.log(e.target.checked);
    }

    console.log(e.target.id);
  };

  transferElements = e => {
    console.log(e);
    if (data1.length === 0) {
      data1.push(data);
      console.log(data1);
      console.log(data1.length);

      //   return (
      //     <tbody>
      //       {data.map(post => (
      //         <tr>
      //           <td>
      //             <Checkbox
      //               id={post.id}
      //               onChange={this.onChangeCheckbox}
      //             ></Checkbox>
      //           </td>
      //           <td>{post.id}</td>
      //           <td>{post.name}</td>
      //         </tr>
      //       ))}
      //     </tbody>
      //   );
    }
  };

  render() {
    console.log(data1);
    return (
      <FlexContainer
        style={{
          justifyContent: "center",
          marginTop: "20px"
        }}
      >
        <TransferWrapper>
          <BeforeTransfer>
            <FlexContainer column>
              <table>
                <thead>
                  <th>#</th>
                  <th>Id</th>
                  <th>Name</th>
                </thead>
                <tbody>
                  {data.map(post => (
                    <tr>
                      <td>
                        <Checkbox
                          id={post.id}
                          onChange={this.onChangeCheckbox}
                        ></Checkbox>
                      </td>
                      <td>{post.id}</td>
                      <td>{post.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </FlexContainer>
          </BeforeTransfer>
          <ArrowArea>
            <TranferArrowArea onClick={e => this.transferElements(e)}>
              <TranferArrow />
            </TranferArrowArea>
            <DoubleTranferArrowArea>
              <DoubleTranferArrow />
            </DoubleTranferArrowArea>
            <UndoTranferArrowArea>
              <UndoTranferArrow />
            </UndoTranferArrowArea>
            <UndoDoubleTranferArrowArea>
              <UndoDoubleTranferArrow />
            </UndoDoubleTranferArrowArea>
          </ArrowArea>
          <AfterTransfer>
            <FlexContainer column>
              <table>
                <thead>
                  <th>#</th>
                  <th>ID</th>
                  <th>Name</th>
                </thead>
                {this.transferElements()}
                {/* <tbody>
                  {this.state.transfered.map(post => (
                    <tr>
                      <td>
                        <Checkbox id={post.id} />
                      </td>
                      <td>{post.id}</td>
                      <td>{post.name}</td>
                    </tr>
                  ))}
                </tbody> */}
              </table>
            </FlexContainer>
          </AfterTransfer>
        </TransferWrapper>
      </FlexContainer>
    );
  }
}
