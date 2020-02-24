import React, { Component } from 'react';
import {
    Icon,
    Table
    , Modal,
    Divider
} from 'antd';
class FinalResultFP extends Component {
    state = {
        tabPosition: 'Suppliers',
        tabPosition1: 'River Sand',
        loading: false,
        visible: false,
        filteredInfo: null,
        sortedInfo: null,
        searchText: '',
        visible: false,

        showComponent: false,

    };

    showModal = () => {
        this.setState({
          visible: true,
        });
      };

      handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };

      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
RowData(record){
    console.log(record)
    this.props.rowtransfer(record.key)
}
    render() {
        const columns = [
            { title: 'Code', dataIndex: 'code', key: 'code' },
            { title: 'Product Name', dataIndex: 'pname', key: 'pname' },
            { title: 'Plant', dataIndex: 'plant', key: 'plant' },
            { title: 'Grade', dataIndex: 'grade', key: 'grade' },
            { title: 'Date', dataIndex: 'date', key: 'date' },
            {
                title: 'Raw Materials', key: 'rwamaterials',
                render: () => 
                <a onClick={this.showModal}><Icon type="solution" /></a>,
                   
                
            },
            {
                title: 'Action', key: 'operation', render: () => (
                    <span>
                        <a><Icon type="edit" /></a>
                        <Divider type="vertical" />
                        <a><Icon type="delete" /></a>
                    </span>
                )
            }
        ];

        const data = [
            {
                key: 1,
                code: 'PR/C15/01',
                pname: 'Solid Waste',
                plant: 'Peliyagoda',
                grade: 15,
                date: '05.06.2017',
                status: ['Succes'],
            },

            {
                key: 2,
                code: 'PR/C20/02',
                pname: 'Domestic',
                plant: 'Jaffna',
                grade: 20,
                date: '05.06.2017',
                status: ['Succes'],
            },

            {
                key: 3,
                code: 'PR/C25/03',
                pname: 'Sierra Piling',
                plant: 'Trincomale',
                grade: 25,
                date: '05.06.2017',
                status: ['Succes'],
            },
        ];
        const expandedRowRender = () => {
            const columns = [
                { title: 'Strength', dataIndex: 'strength', key: 'strength', width: '15%' },
                { title: 'Iteration1', dataIndex: 'Iteration1', key: 'Iteration1', width: '15%' },
                { title: 'Iteration2', dataIndex: 'Iteration2', key: 'Iteration2', width: '15%' },

                { title: 'Iteration3', dataIndex: 'Iteration3', key: 'Iteration3', width: '15%' },

            ];


            const data = [
                {
                    key: '1',
                    strength: "7Days",
                    Iteration1: "20",
                    Iteration2: '30',
                    Iteration3: '40',
                },
                {
                    key: '2',
                    strength: "28Days",
                    Iteration1: "20",
                    Iteration2: '30',
                    Iteration3: '40',
                },
            ];
            return <Table columns={columns} dataSource={data} pagination={false} size="small" />;
        };
        return (
        

                <div
                    style={{
                        padding: 12,
                        background: '#eef6fc',
                        minHeight: '500px',
                        marginTop: '10px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                    }}>


                    <div>
                      
                        <Table
                            style={{ fontSize: '6px' }}
                            className="components-table-demo-nested"
                            columns={columns}
                            expandedRowRender={expandedRowRender}
                            dataSource={data}
                            size="small" 
                            onRow={(record, rowIndex) => {
                                return {
                                  onClick: event => {this.RowData(record)}, // click row
                                  onDoubleClick: event => {}, // double click row
                                  onContextMenu: event => {}, // right button click row
                                  onMouseEnter: event => {}, // mouse enter row
                                  onMouseLeave: event => {}, // mouse leave row
                                }}}
                            />

                    </div>
                    <Modal
          title="Raw Materials"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
       
        >
          <div
            style={{
              padding: 24,
              background: '#fff',
              minHeight: '100px',

            }}>

<table border = "1">
               <tr >
                   <th style={{width:'200px'}} >Raw Materials</th>
                   <th> Quantity</th>
               </tr>

               <tr>
                   <td >Cement</td>
                   <td> 5</td>
               </tr>

               <tr>
                   <td >AdMixture</td>
                   <td> 7</td>
               </tr>
               </table>

               
          </div>
         

        </Modal>


                </div>
        

        );
    }
}

export default FinalResultFP;