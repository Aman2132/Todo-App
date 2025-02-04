import React, { useState } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Task } from '../Interface/Task';
import { Button } from 'react-bootstrap';

interface TaskTableProps {
  tasks: Task[];
  toggleTaskCompletion: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, toggleTaskCompletion, deleteTask }) => {
  const [paginationModel, setPaginationModel] = useState({ pageSize: 5, page: 0 });

 
  const rows = tasks.map((task, index) => ({
    ...task,
    id: task.id, 
    serial: index + 1, 
  }));

  const columns: GridColDef[] = [
    { field: 'serial', headerName: 'S.No', width: 100 },
    { field: 'name', headerName: 'Task Name', width: 200 },
    {
      field: 'completed',
      headerName: 'Completed',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <input
          type="checkbox"
          checked={params.row.completed}
          onChange={() => toggleTaskCompletion(params.id as number)}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Button variant="danger" onClick={() => deleteTask(params.id as number)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        checkboxSelection
      />
    </div>
  );
};

export default TaskTable;
