import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import styles from './users.module.css';
import { useGetUsersQuery } from 'state/api';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 300 },
  { field: 'email', headerName: 'User Email', width: 300 }
];

const Users = () => {
  const { data = [], isFetching } = useGetUsersQuery();

  return (
    <div className={styles.container}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        loading={isFetching}
      />
    </div>
  );
};

export default Users;
