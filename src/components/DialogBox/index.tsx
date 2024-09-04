// ConfirmationDialog.tsx

import React from 'react';
import { CancelButton } from '../Botton';
import { ConfirmationDialogProps } from './props';
import AlertImg from '../../images/SideBar/Alert';


const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ message, onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex  justify-center items-center shadow-8 bg-gray-700 bg-opacity-50 z-50">
      
      <div className="bg-white p-5 h-max w-100 rounded-lg shadow-md">
      {/* <button onClick={onCancel} className="px-4 py-2 ml-96 -mr-10 -mt-9  rounded  focus:outline-none">
      <CancelImg />
          </button> */}
          <p className='flex justify-center items-center text-red-600'><AlertImg/></p>
        <p className="flex justify-center text-center mt-5 text-xl font-medium font-mono ">{message}</p>
        <p className="mb-4 mt-2 text-gray-500 text-center font-thin "></p>
        <div className="flex justify-end items-end gap-3 mt-5">
          <CancelButton onClick={onCancel} className="px-5 py-1.5 ml-56 focus:outline-none rounded" children='Cancel' type="button" />
            
          <button onClick={onConfirm} className="px-5 py-1.5 text-white bg-red-500 rounded hover:bg-red-7 focus:outline-none" type='submit'>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
