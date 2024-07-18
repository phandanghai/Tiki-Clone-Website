import React from 'react';
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from '@syncfusion/ej2-react-kanban';
const Kanban = () => {
  const data = [
    {
      Id: 1,
      Status: 'Open',
      Summary: 'Task 1',
    },
    {
      Id: 2,
      Status: 'In Progress',
      Summary: 'Task 2',
    },
    {
      Id: 3,
      Status: 'Done',
      Summary: 'Task 3',
    },
    {
      Id: 4,
      Status: 'Testing',
      Summary: 'Task 4',
    },
    {
      Id: 5,
      Status: 'Open',
      Summary: 'Task 5',
    },
    {
      Id: 6,
      Status: 'Done',
      Summary: 'Task 6',
    },
    {
      Id: 7,
      Status: 'To Do',
      Summary: 'Task 7',
    },
    {
      Id: 8,
      Status: 'In Progress',
      Summary: 'Task 8',
    },
    {
      Id: 9,
      Status: 'Testing',
      Summary: 'Task 9',
    },
  ];
  return (
    <div className="w-full h-full pt-4 pl-5 bg-main-bg">
      <KanbanComponent
        id="kanban"
        keyField="Status"
        dataSource={data}
        cardSettings={{ contentField: 'Summary', headerField: 'Id' }}
        width={1100}
        backgroundColor="#2a3447"
      >
        <ColumnsDirective>
          <ColumnDirective headerText="To Do" keyField="Open" />
          <ColumnDirective headerText="In Progress" keyField="In Progress" />
          <ColumnDirective headerText="Testing" keyField="Testing" />
          <ColumnDirective headerText="Done" keyField="Done" />
        </ColumnsDirective>
      </KanbanComponent>
    </div>
  );
};

export default Kanban;
