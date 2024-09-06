/* eslint-disable */
// All code here will not be checked by ESLint
import React, { useState } from 'react';
import { Box } from '@mui/material';
import {GridColDef } from '@mui/x-data-grid';
import useGallery from '../useGallery';
import EditGalleryIndex from './EditGallery';
import ViewGalleryIndex from './ViewGallery';
import { AddGalleryIndex } from './AddGallery';
import EditImg from '../../../assets/images/Edit';
import ViewImg from '../../../assets/images/View';
import DeleteImg from '../../../assets/images/Delete';
import Button from '../../../components/Button';
import CustomDataGrid from '../../../components/CustomDataGrid';
import Loader from '../../../components/Loder';

const Gallerys: React.FC = () => {
  const { selectedGallery, selectedGalleryId, galleryData, handleCancelDelete, setDefaultGalleryId, handleView, handleEdit,  handleDelete , showAddGalleryModal, toggleAddGalleryModal, handleConfirmDelete , handleClick,loading ,showConfirmation} = useGallery()
  
  const columns: GridColDef[] = [
    {
      field: 'image',
      headerName: 'Gallery Image',
      align: 'center',
      flex: 0.5,
      renderCell: (params) => (
        <img src={params.value} alt="image" />
      )
    },
    { field: '_id', headerName: 'Gallery ID', flex: 0.7, align: 'center' },
    { field: 'title', headerName: 'Title', flex: 0.5, align: 'center' },
   
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
        <Button onClick={toggleAddGalleryModal} className="  py-2 px-6 rounded" children='Add Gallery' type='button' />
        </Box>
        {showAddGalleryModal && (
          <AddGalleryIndex closeModal={toggleAddGalleryModal} />
        )}
        {selectedGallery ? (
          <ViewGalleryIndex gallery={selectedGallery} />
        ) : selectedGalleryId ? (
          <EditGalleryIndex GalleryId={selectedGalleryId} />
        ) : (<>
         <CustomDataGrid
            rows={galleryData}
            columns={columns}
            loading={!galleryData}
            showConfirmation={showConfirmation}
            confirmationMessage="Are you sure you want to delete this gallery?"
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

export default Gallerys;
