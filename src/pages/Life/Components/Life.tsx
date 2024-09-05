/* eslint-disable */
// All code here will not be checked by ESLint
import React, { useState } from 'react';
import { Box } from '@mui/material';
import {GridColDef } from '@mui/x-data-grid';
import useLife from '../useLife';
import EditLifeIndex from './EditLife';
import ViewLifeIndex from './ViewLife';
import { AddLifeIndex } from './AddLife';
import EditImg from '../../../assets/images/Edit';
import ViewImg from '../../../assets/images/View';
import DeleteImg from '../../../assets/images/Delete';
import Button from '../../../components/Button';
import CustomDataGrid from '../../../components/CustomDataGrid';
import Loader from '../../../components/Loder';

const Lifes: React.FC = () => {
  const { selectedLife, selectedLifeId, lifeData, handleCancelDelete, setDefaultLifeId, handleView, handleEdit,  handleDelete , showAddLifeModal, toggleAddLifeModal, handleConfirmDelete , handleClick,loading ,showConfirmation} = useLife()
  
  const columns: GridColDef[] = [
    {
      field: 'image',
      headerName: 'Life Image',
      align: 'center',
      flex: 0.5,
      renderCell: (params) => (
        <img src={params.value} alt="image" />
      )
    },
    { field: '_id', headerName: 'Life ID', flex: 0.7, align: 'center' },
    { field: 'title', headerName: 'Title', flex: 0.5, align: 'center' },
    { field: 'paragraph', headerName: 'Description', flex: 0.5, align: 'center' },
    {
      field: 'Actions',
      headerName: 'Actions',
      width:200,
      align: 'center',
      renderCell: (params) => (
        <div className="mt-2 flex justify-center space-x-2">
          <button onClick={() => handleClick(async () => handleEdit(params.row._id))} className="text-primary hover:text-primary-2">
            <EditImg />
          </button>
          <button onClick={() => handleClick(async () => handleView(params.row._id))}className="text-gray-500 hover:text-gray-700">
            <ViewImg />
          </button>
          <button onClick={() => handleClick(async () => handleDelete(params.row._id))} className="text-red-5 hover:text-red-7">
            <DeleteImg />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className='container'>
      {loading && <Loader />}
      <Box m="20px" style={{ zIndex: 0 }}>
        <Box className="grid justify-items-end -mb-7 m-2">
        <Button onClick={toggleAddLifeModal} className="  py-2 px-6 rounded" children='Add Life' type='button' />
        </Box>
        {showAddLifeModal && (
          <AddLifeIndex closeModal={toggleAddLifeModal} />
        )}
        {selectedLife ? (
          <ViewLifeIndex life={selectedLife} />
        ) : selectedLifeId ? (
          <EditLifeIndex LifeId={selectedLifeId} />
        ) : (<>
         <CustomDataGrid
            rows={lifeData}
            columns={columns}
            loading={!lifeData}
            showConfirmation={showConfirmation}
            confirmationMessage="Are you sure you want to delete this life?"
            onCancelDelete={handleCancelDelete}
            onConfirmDelete={handleConfirmDelete}
            toolbarProps={{ toolbar: { showQuickFilter: true } }}
          />
        </>
        )}
      </Box>
    </div>
  );
};

export default Lifes;
