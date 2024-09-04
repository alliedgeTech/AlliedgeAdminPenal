import React from "react";
import { Column } from "../../../components/CommonDataGrid/props";
import CommonDataGrid from "../../../components/CommonDataGrid";
import Loader from "../../../components/Loader";
import useContact from "../useContact";

const Contact: React.FC = () => {
  const {
    ContactData,
    showConfirmation,
    loading,
    handleCancelStatusUp,
    handleConfirmStatusUp,
    handleDateFilter,
  } = useContact();

  
  const style: any = {
    ACTIVE: "bg-green-300 rounded",
    INACTIVE: "bg-red-300 rounded",
  };

  const contactDataWithSerial = ContactData.map((row, index) => ({
    ...row,
    "Sr No.": index + 1,
  }));

  const columns: Column[] = [
    { field: "Sr No.", headerName: "Sr No.", align: "center", width: 100 },
    {
      field: "name",
      headerName: "Name",
      align: "center",
      width: 50,
    },
    {
      field: "email",
      headerName: "Email",
      align: "center",
      width: 50,
    },
    {
      field: "mobile",
      headerName: "Mobile No.",
      align: "center",
      width: 50,
    },
    {
      field: "subject",
      headerName: "Subject",
      align: "center",
      width: 50,
    },
    {
      field: "message",
      headerName: "Message",
      align: "center",
      width: 50,
    },
  ];

  return (
    <div className="mx-auto p-4">
      {loading && <Loader />}
      <>
        <CommonDataGrid
          rows={contactDataWithSerial}
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
          loading={!ContactData}
          onDateFilter={handleDateFilter}
        />
      </>
    </div>
  );
};

export default Contact;
