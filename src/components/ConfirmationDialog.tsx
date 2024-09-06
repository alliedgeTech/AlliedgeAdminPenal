// ConfirmationDialog.tsx

import React from 'react';
import CancelImg from '../assets/images/Cancel'
import { CancelButton } from './Button';
interface ConfirmationDialogProps {
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ message, onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-main-dark-bg bg-opacity-50">
      
      <div className="bg-main-bg p-5 h-max w-max rounded-lg shadow-md">
      <button onClick={onCancel} className="px-4 py-2 ml-96 -mr-10 -mt-9  rounded  focus:outline-none">
      <CancelImg />
          </button>
        <p className="mt-5 text-xl font-light font-mono ">{message}</p>
        <p className="mb-4 mt-2 text-gray-400 font-thin italic">If you delete this after you can't recover it.</p>
        <div className="flex gap-3 mt-10">
          <CancelButton onClick={onCancel} className="px-5 py-1.5 ml-56 focus:outline-none rounded" children='Cancel' type='button' />
            
          <button onClick={onConfirm} className="px-5 py-1.5 text-white bg-red-5 rounded hover:bg-red-7 focus:outline-none">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
