import React, { useState, useEffect } from "react";
import CustomDropdown from "../DropDown/index";
import ConfirmationDialog from "../DialogBox";
import { CommonDataGridProps } from "./props";
import SearchImg from "../../images/SideBar/Search";
import Loader from "../Loader";
import { week } from "./MockData";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const CommonDataGrid: React.FC<CommonDataGridProps> = ({
  rows,
  columns: initialColumns,
  getRowId,
  showConfirmation,
  confirmationMessage,
  onCancelDelete,
  onConfirmDelete,
  loading,
  toolbarQuickFilter = true,
  onDateFilter,
  ...rest
}) => {
  const [sortValue, setSortValue] = useState("1"); // Default to the first option ID
  const [currentPage, setCurrentPage] = useState(1);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const [columns, setColumns] = useState(initialColumns);
  const [columnWidths, setColumnWidths] = useState(
    columns.map((col) => col.width)
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredRows, setFilteredRows] = useState(rows);

  useEffect(() => {
    if (rows.length > 0) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = rows?.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(lowercasedQuery)
        )
      );
      setFilteredRows(filtered);// Filter rows based on search query
      setCurrentPage(1); // Reset to first page on search
    }
    
   
  }, [searchQuery, rows]);

  useEffect(() => {
    if (rows.length > 0) {
      const now = new Date();
      let filtered = rows;
    
      switch (sortValue) {
        case "1": // All
          filtered = rows;
          break;
        case "2": // Today
          filtered = rows?.filter((row) => {
            const rowDate = new Date(row.created || row.createdDateTime);
            return rowDate.toDateString() === now.toDateString();
          });
          break;
        case "3": // Yesterday
          const yesterday = new Date(now);
          yesterday.setDate(yesterday.getDate() - 1);
          filtered = rows?.filter((row) => {
            const rowDate = new Date(row.created || row.createdDateTime);
            return rowDate.toDateString() === yesterday.toDateString();
          });
          break;
        case "4": // Last 7 Days
          const last7Days = new Date(now);
          last7Days.setDate(last7Days.getDate() - 7);
          filtered = rows?.filter((row) => {
            const rowDate = new Date(row.created || row.createdDateTime);
            return rowDate >= last7Days && rowDate <= now;
          });
          break;
        case "5": // Last Month
          const lastMonth = new Date(now);
          lastMonth.setMonth(lastMonth.getMonth() - 1);
          filtered = rows?.filter((row) => {
            const rowDate = new Date(row.created || row.createdDateTime);
            return (
              rowDate.getMonth() === lastMonth.getMonth() &&
              rowDate.getFullYear() === lastMonth.getFullYear()
            );
          });
          break;
        case "6": // Custom
          if (fromDate && toDate) {
            filtered = rows.filter((row) => {
              const rowDate = new Date(row.created || row.createdDateTime);
              return rowDate >= fromDate && rowDate <= toDate;
            });
          }
          break;
        default:
          filtered = rows;
      }
    
      setFilteredRows([...filtered]);
      setCurrentPage(1); // Reset to first page on filter change
    }
    // Filter rows based on sortValue
  
  }, [sortValue, fromDate, toDate, rows]);
  

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setFromDate(start);
    setToDate(end);
    if (start && end) {
      onDateFilter(start, end);
    }
  };

  const handleMouseDown = (index: number, event: React.MouseEvent) => {
    const startX = event.clientX;
    const startWidth = columnWidths[index];

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = startWidth + moveEvent.clientX - startX;
      setColumnWidths((prevWidths) => {
        const updatedWidths = [...prevWidths];
        updatedWidths[index] = newWidth > 50 ? newWidth : 50; // Minimum width of 50
        return updatedWidths;
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="h-[75vh] mb-50">
      <div className="flex justify-between items-center mb-4">
        {/* <h6 className="text-lg font-semibold text-fontColor">Table</h6> */}
        <div className="flex items-center space-x-2">
          
          {sortValue === "6" && (
            <>
              <div date-rangepicker className="flex items-center">
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </div>
                  <DatePicker
                    selected={fromDate}
                    onChange={(date: any) => handleDateChange(date, toDate)}
                    selectsStart
                    startDate={fromDate}
                    endDate={toDate}
                    placeholderText="Select date start"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <span className="mx-4 text-gray-500">to</span>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </div>
                  <DatePicker
                    selected={toDate}
                    onChange={(date: any) => handleDateChange(fromDate, date)}
                    selectsEnd
                    startDate={fromDate}
                    endDate={toDate}
                    placeholderText="Select date end"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
            </>
          )}
          <div className="flex items-center h-10 w-40 bg-white rounded-md shadow-md relative text-fontColLit1">
            <SearchImg />
            <input
              type="search"
              className="w-full pl-10 py-1 rounded-md focus:outline-none bg-transparent"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <CustomDropdown
            label=""
            options={week}
            defaultOptionId={sortValue}
            setDefaultOptionId={setSortValue}
            displayProperty="name"
            value={sortValue}
          />
        </div>
      </div>

      {showConfirmation && (
        <ConfirmationDialog
          message={confirmationMessage}
          onCancel={onCancelDelete}
          onConfirm={onConfirmDelete}
        />
      )}

      <div className="border-2 border-gray-300 bg-white rounded-lg overflow-auto shadow-1">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-white border-b-2 border-gray-300 m-2">
              {columns.map((column, index) => (
                <th
                  key={column.field}
                  className={`relative p-2 text-gray-500 font-semibold last:border-r-0 ${
                    index === columns.length - 1 ? "sticky-column" : ""
                  }`}
                  style={{ width: columnWidths[index] }}
                >
                  {column.headerName}
                  <div
                    onMouseDown={(event) => handleMouseDown(index, event)}
                    className="absolute right-0 top-0 h-full w-1 cursor-col-resize"
                    style={{
                      transform: "translateX(10%)",
                      background: "rgba(0, 0, 0, 0)",
                    }}
                  ></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((row) => (
              <tr key={getRowId(row)} className="border-b border-gray-200">
                {columns.map((column, index) => (
                  <td
                    key={column.field}
                    className={`p-2 border-gray-200 last:border-r-0 text-center font-medium text-gray-600 ${
                      index === columns.length - 1 ? "sticky-column" : ""
                    }`}
                  >
                    {column.renderCell
                      ? column.renderCell({ value: row[column.field], row })
                      : row[column.field]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <Loader />}
        {!loading && filteredRows.length === 0 && (
          <div className="p-4 text-center">No results found.</div>
        )}
      </div>

      <div className="flex justify-end items-center mt-4">
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 border border-gray-200 rounded-md shadow-2 bg-white text-fontColor font-medium hover:bg-gray-100"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span className="text-sm font-medium text-fontColor m-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-3 py-1 border border-gray-300 rounded-md shadow-2 text-fontColor font-medium bg-white hover:bg-gray-100"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommonDataGrid;