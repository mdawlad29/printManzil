"use client";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import DataTable from "./DataTable";
import Heading from "../shared/Heading";

interface IUser {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
}

const UserTable = () => {
  const [userData, setUserData] = useState<IUser[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState(0);
  const [totalEntries, setTotalEntries] = useState(0);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof IUser;
    direction: string;
  } | null>(null);
  const itemsPerPage = 10;

  // API call
  useEffect(() => {
    if (pagination === 0) {
      fetch(`https://api.razzakfashion.com/`)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data?.data || []);
          setTotalEntries(data?.total || 0);
        })
        .catch((err) => console.log(err));
    } else {
      fetch(`https://api.razzakfashion.com/?paginate=${pagination}`)
        .then((res) => res.json())
        .then((data) => setUserData(data?.data || []))
        .catch((err) => console.log(err));
    }
  }, [pagination]);

  // Sort the data
  const sortedData = React.useMemo(() => {
    if (sortConfig !== null) {
      return [...userData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return userData;
  }, [userData, sortConfig]);

  // Filter the data
  const userFilterData = sortedData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (userFilterData.length > 0) {
      setSelectAll(selectedIds.length === userFilterData.length);
    }
  }, [selectedIds, userFilterData]);

  return (
    <>
      <Heading title="Task One: User Data Table" />

      <div className="p-6 bg-gray-900 min-h-screen text-white rounded-lg mb-20">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search area"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:ring focus:ring-blue-500"
          />
        </div>

        {userData?.length > 0 ? (
          <DataTable
            selectAll={selectAll}
            sortConfig={sortConfig}
            selectedIds={selectedIds}
            setSortConfig={setSortConfig}
            setSelectAll={setSelectAll}
            setSelectedIds={setSelectedIds}
            userFilterData={userFilterData}
          />
        ) : (
          <p className="text-center my-20">loading....</p>
        )}

        <Pagination
          pagination={pagination}
          totalEntries={totalEntries}
          itemsPerPage={itemsPerPage}
          userFilterData={userFilterData}
          setPagination={setPagination}
        />
      </div>
    </>
  );
};

export default UserTable;
