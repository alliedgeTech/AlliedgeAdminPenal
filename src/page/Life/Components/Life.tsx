import React from "react";
import EditImg from "../../../images/SideBar/Edit";
import DeleteImg from "../../../images/SideBar/Delete";
import { Column } from "../../../components/CommonDataGrid/props";
import CommonDataGrid from "../../../components/CommonDataGrid";
import Loader from "../../../components/Loader";
import EditLifeIndex from "./EditLife/index";
import useLife from "../useLife";
import Button from "../../../components/Botton";

const Life: React.FC = () => {
  const {
    selectedLifeId,
    LifeData,
    showConfirmation,
    loading,
    handleEdit,
    handleCancelStatusUp,
    handleConfirmStatusUp,
    handleStatusUp,
    handleDateFilter,
    handleAdd,
  } = useLife();

  const style: any = {
    ACTIVE: "bg-green-300 rounded",
    INACTIVE: "bg-red-300 rounded",
  };

  const lifeDataWithSerial = LifeData.map((row, index) => ({
    ...row,
    "Sr No.": index + 1,
  }));

  const columns: Column[] = [
    {
      field: 'images',
      headerName: 'Life Image',
      align: 'center',
      width: 0,
      renderCell: (params) => {
        const firstImage = params.value && params.value.length > 0 ? params.value[0] : null;
        return firstImage ? (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img
            src={firstImage}
            alt="Life Image"
            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
          />
        ) : (
          <span>No Image</span>
        );
      },
      
    },
    { field: "Sr No.", headerName: "Sr No.", align: "center", width: 100 },
    { field: "title", headerName: "Title", align: "center", width: 50 },
    

   
    
    {
      field: "Actions",
      headerName: "Actions",
      width: 100,
      align: "center",
      renderCell: (params) => (
        <div className="flex space-x-2 justify-center">
          <button
            onClick={() => handleEdit(params.row._id)}
            className="text-fontColor hover:text-primary-2"
          >
            <EditImg />
          </button>
          <button
            onClick={() => handleStatusUp(params.row._id, params.row.status)}
            className="text-red-500 hover:text-red-700"
          >
            <DeleteImg />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto p-4">
      {loading && <Loader />}
      {selectedLifeId ? (
        <EditLifeIndex LifeId={selectedLifeId} />
      ) : (
        <>
          <div className="grid justify-items-end -mb-11 mr-1">
            <Button
              onClick={handleAdd}
              className="py-1.5 px-9 rounded"
              children="Add Life"
              type="button"
            />
          </div>
          <CommonDataGrid
            rows={lifeDataWithSerial}
            columns={columns}
            getRowId={(row) => row._id}
            showConfirmation={showConfirmation}
            confirmationMessage="Are you sure you want to delete this property?"
            onCancelDelete={() => {
              handleCancelStatusUp();
            }}
            onConfirmDelete={() => {
              handleConfirmStatusUp();
            }}
            loading={!LifeData}
            onDateFilter={handleDateFilter}
          />
        </>
      )}
    </div>
  );
};

export default Life;
