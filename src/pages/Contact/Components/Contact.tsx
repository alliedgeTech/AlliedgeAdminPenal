/* eslint-disable */
// All code here will not be checked by ESLint
import React, { useState } from 'react';
import { Box } from '@mui/material';
import {GridColDef } from '@mui/x-data-grid';
import useContact from '../useContact';
import EditContactIndex from './EditContact';
import ViewContactIndex from './ViewContact';
import { AddContactIndex } from './AddContact';
import EditImg from '../../../assets/images/Edit';
import ViewImg from '../../../assets/images/View';
import DeleteImg from '../../../assets/images/Delete';
import Button from '../../../components/Button';
import CustomDataGrid from '../../../components/CustomDataGrid';
import Loader from '../../../components/Loder';

const Contacts: React.FC = () => {
  const { selectedContact, selectedContactId, contactData, handleCancelDelete, setDefaultLatestNewsId, handleView, handleEdit,  handleDelete , showAddContactModal, toggleAddContactModal, handleConfirmDelete , handleClick,loading ,showConfirmation} = useContact()
  
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      align: 'center',
      flex: 0.5,
    },
   
    { field: 'mobile', headerName: 'Mobile No.', flex: 0.5, align: 'center' },
    { field: 'subject', headerName: 'Subject', flex: 0.5, align: 'center' },
    { field: 'message', headerName: 'Message', flex: 0.6, align: 'center' },
    { field: 'email', headerName: 'Email', flex: 0.5, align: 'center' },

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
          {/* <button onClick={() => handleClick(async () => handleView(params.row.id))}className="text-gray-500 hover:text-gray-700">
            <ViewImg />
          </button> */}
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
        <Button onClick={toggleAddContactModal} className="  py-2 px-6 rounded" children='Add Contact' type='button' />
        </Box>
        {showAddContactModal && (
          <AddContactIndex closeModal={toggleAddContactModal} />
        )}
        {selectedContact ? (
          <ViewContactIndex contact={selectedContact} />
        ) : selectedContactId ? (
          <EditContactIndex ContactId={selectedContactId} />
        ) : (<>
         <CustomDataGrid
            rows={contactData}
            columns={columns}
            loading={!contactData}
            showConfirmation={showConfirmation}
            confirmationMessage="Are you sure you want to delete this contact?"
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

export default Contacts;
