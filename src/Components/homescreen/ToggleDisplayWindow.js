// import React, { Component } from "react";
// import { Modal, Divider, Tooltip } from "antd";

// export class ToggleDisplayWindow extends Component {
//   constructor(props) {
//     super();
//     console.log(props);
//     this.state = {
//       visible: false,
//       parameter: props
//     };
//     console.log(this.state.parameter);
//   }

//   componentDidUpdate() {
//     this.renderComponents();
//   }

//   renderComponents = () => {
//     console.log(this.state.parameter);
//     if (this.state.parameter === "FineAggregate") {
//       return (
//         <div style={{ height: "100px", width: "200px", background: "red" }}>
//           <p>FineAggregate</p>
//           <p>Some contents...</p>
//           <p>Some contents...</p>
//         </div>
//       );
//     } else {
//       return (
//         <div style={{ height: "100px", width: "200px", background: "red" }}>
//           <p>Some contents...</p>
//         </div>
//       );
//     }
//   };

//   // handleCancel() {
//   //   this.setState({
//   //     visible: false
//   //   });
//   // }

//   render() {
//     const { parameter } = this.state;
//     return <div>{this.renderComponents()}</div>;
//   }
// }
