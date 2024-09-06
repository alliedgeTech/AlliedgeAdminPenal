import React from "react";
import EditImg from "../../../images/SideBar/Edit";
import DeleteImg from "../../../images/SideBar/Delete";
import { Column } from "../../../components/CommonDataGrid/props";
import CommonDataGrid from "../../../components/CommonDataGrid";
import Loader from "../../../components/Loader";
import EditPropertyIndex from "./EditProperty/index";
import useProperty from "../useProperty";
import Button from "../../../components/Botton";

const Property: React.FC = () => {
  const {
    selectedPropertyId,
    PropertyData,
    showConfirmation,
    loading,
    handleEdit,
    handleCancelStatusUp,
    handleConfirmStatusUp,
    handleStatusUp,
    handleDateFilter,
    handleAdd,
  } = useProperty();

  const style: any = {
    ACTIVE: "bg-green-300 rounded",
    INACTIVE: "bg-red-300 rounded",
  };

  const propertyDataWithSerial = PropertyData.map((row, index) => ({
    ...row,
    "Sr No.": index + 1,
  }));

  const columns: Column[] = [
    { field: "Sr No.", headerName: "Sr No.", align: "center", width: 100 },
    { field: "name", headerName: "Name", align: "center", width: 50 },
    { field: "location", headerName: "Location", align: "center", width: 50 },
    { field: "propertyType", headerName: "Property Type", align: "center", width: 50 },
    { field: "price", headerName: "Price", align: "center", width: 50 },
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
      {selectedPropertyId ? (
        <EditPropertyIndex PropertyId={selectedPropertyId} />
      ) : (
        <>
          <div className="grid justify-items-end -mb-11 mr-1">
            <Button
              onClick={handleAdd}
              className="py-1.5 px-9 rounded"
              children="Add Property"
              type="button"
            />
          </div>
          <CommonDataGrid
            rows={propertyDataWithSerial}
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
            loading={!PropertyData}
            onDateFilter={handleDateFilter}
          />
        </>
      )}
    </div>
  );
};

export default Property;
