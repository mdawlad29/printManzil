import moment from "moment";
import React from "react";
import { GoArrowDown, GoArrowUp } from "react-icons/go";

interface IUser {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
}

interface ITableProps {
  selectAll: boolean;
  sortConfig: {
    key: keyof IUser;
    direction: string;
  } | null;
  selectedIds: number[];
  userFilterData: IUser[];
  setSelectAll: (value: boolean) => void;
  setSortConfig: React.Dispatch<
    React.SetStateAction<{
      key: keyof IUser;
      direction: string;
    } | null>
  >;
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const DataTable = ({
  selectAll,
  sortConfig,
  selectedIds,
  setSelectAll,
  setSortConfig,
  setSelectedIds,
  userFilterData,
}: ITableProps) => {
  const requestSort = (key: keyof IUser) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      const allIds = userFilterData.map((user) => user.id);
      setSelectedIds(allIds);
    }
    setSelectAll(!selectAll);
  };

  const toggleSelectRow = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-4 py-2 border border-gray-700 flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
                className="w-4 h-4"
              />
              ID
            </th>
            <th className="px-4 py-2 border border-gray-700">
              <button
                className="flex items-center gap-2"
                onClick={() => requestSort("name")}
              >
                Name
                {sortConfig?.key === "name" ? (
                  sortConfig.direction === "ascending" ? (
                    <GoArrowUp />
                  ) : (
                    <GoArrowDown />
                  )
                ) : (
                  <>
                    <GoArrowUp />
                    <GoArrowDown />
                  </>
                )}
              </button>
            </th>
            <th className="px-4 py-2 border border-gray-700">
              <button
                className="flex items-center gap-2"
                onClick={() => requestSort("email")}
              >
                Email
                {sortConfig?.key === "email" ? (
                  sortConfig.direction === "ascending" ? (
                    <GoArrowUp />
                  ) : (
                    <GoArrowDown />
                  )
                ) : (
                  <>
                    <GoArrowUp />
                    <GoArrowDown />
                  </>
                )}
              </button>
            </th>
            <th className="px-4 py-2 border border-gray-700">Verified Date</th>
          </tr>
        </thead>
        <tbody>
          {userFilterData.map((item: IUser, index: number) => (
            <tr
              key={item.id}
              className={`${
                index % 2 === 0 ? "bg-gray-800" : "hover:bg-gray-700"
              }`}
            >
              <td className="px-4 py-2 border border-gray-700 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => toggleSelectRow(item.id)}
                  className="w-4 h-4"
                />
                {item.id}
              </td>
              <td className="px-4 py-2 border border-gray-700">{item?.name}</td>
              <td className="px-4 py-2 border border-gray-700">
                {item?.email}
              </td>
              <td className="px-4 py-2 border border-gray-700">
                {moment(item?.email_verified_at).format("DD-MM-YYYY")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
