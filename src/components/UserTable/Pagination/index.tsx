import React from "react";

interface IUser {
  id: number;
  name: string;
  email: string;
}

interface IProps {
  pagination: number;
  totalEntries: number;
  itemsPerPage: number;
  userFilterData: IUser[];
  setPagination: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({
  pagination,
  totalEntries,
  itemsPerPage,
  setPagination,
  userFilterData,
}: IProps) => {
  const handleNext = () => {
    if (pagination === 0) {
      setPagination(1);
    } else if (pagination * itemsPerPage < totalEntries) {
      setPagination(pagination + 1);
    }
  };

  const handlePrevious = () => {
    if (pagination > 1) {
      setPagination(pagination - 1);
    }
  };

  return (
    <div className="mt-4 text-sm flex justify-between items-center">
      <span>
        Showing {pagination === 0 ? totalEntries : userFilterData.length} of{" "}
        {totalEntries} entries
      </span>
      <div className="flex items-center gap-4">
        <button
          onClick={handlePrevious}
          disabled={pagination <= 1}
          className={`px-4 py-2 rounded ${
            pagination <= 1
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <span>{pagination === 0 ? "All" : pagination}</span>
        <button
          onClick={handleNext}
          disabled={
            pagination !== 0 && pagination * itemsPerPage >= totalEntries
          }
          className={`px-4 py-2 rounded ${
            pagination !== 0 && pagination * itemsPerPage >= totalEntries
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
