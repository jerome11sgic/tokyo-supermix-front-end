import React from  'react';
import {Checkbox,Table} from 'antd';


export default class FinalProductParameter extends React.Component {
  

    render(){
      const columns2 = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
  
        },
        {
          title: 'Parameter',
          dataIndex: 'parameter',
          key: 'parameter',
  
        },
        {
          title: 'Unit',
          dataIndex: 'unit',
          key: 'unit'
  
        },
        {
          title: 'Value',
          dataIndex: 'Value',
          key: 'Value',
  
        },
  
        {
          title: 'Relevant',
          dataIndex: 'Relevant',
          key: 'Reelvant',
          render: (record, key) => <Checkbox />,
  
        },
  
  
      ];
  
      const data = [
        {
          key: '1',
          id: 1,
          description: "Size",
          unit: 'mm',
          Value: "0.5",
        },
        {
          key: '2',
          id: 2,
          description: "Temperature",
          unit: 'k',
          Value: "25",
        },
        {
          key: '3',
          id: 3,
          description: "Moisture",
          unit: 'k',
          Value: "20",
  
        },
        {
          key: '4',
          id: 4,
          description: "Gravity",
          unit: 'N',
          Value: "15",
        },
        {
          key: '5',
          id: 5,
          description: "Weight",
          unit: 'g',
          Value: "5",
        },
        {
          key: '6',
          id: 6,
          description: "Density",
          unit: 'g',
          Value: "4",
        },
      ];
      const data1 = [
        {
          key: '1',
          id: 1,
          parameter: "Strength",
          Value: "1",
          unit: "N",
        },
        {
          key: '2',
          id: 2,
          parameter: "Weight",
          Value: "2",
          unit: "g",
        },
        {
          key: '3',
          id: 3,
          parameter: "Water Demand",
          Value: "3",
          unit: "g",
  
        },
        {
          key: '4',
          id: 4,
          parameter: "Gravity",
          Value: "4",
          unit: "N",
        },
      ];
        return(
          <Table columns={columns2} dataSource={data1} pagination={false} size="small" />

)
    }
}
