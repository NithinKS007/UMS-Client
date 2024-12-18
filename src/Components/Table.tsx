import React from "react";
import FilterComponent from "./FilterComponent";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
} from "@mui/material";

interface TableColumn {
  label: string;
  field: string;
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
  sort: any[];
  filter: any[];
  direction: any[];
  toggleuserBlockStatus: (id: string, blockStatus: boolean) => void;
}

const ReuseTable: React.FC<TableProps> = ({
  columns,
  data,
  sort,
  filter,
  direction,
  toggleuserBlockStatus,
}) => {
  const handleCheckboxToggle = (id: string, currentBlockedStatus: boolean) => {
    console.log("helo staus", id, currentBlockedStatus);

    toggleuserBlockStatus(id, !currentBlockedStatus);
  };

  return (
    <>
      <FilterComponent sort={sort} filter={filter} direction={direction} />
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "100%", margin: "auto" }}
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  padding="checkbox"
                  sx={{ textAlign: "center", padding: "4px" }}
                >
                  <Checkbox />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    sx={{ textAlign: "left", padding: "4px" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell
                    padding="checkbox"
                    sx={{ textAlign: "center", padding: "4px" }}
                  >
                    <Checkbox
                      checked={row.isBlocked}
                      onChange={() =>
                        handleCheckboxToggle(row._id, row.isBlocked)
                      }
                    />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell
                      key={column.field}
                      sx={{ textAlign: "left", padding: "4px" }}
                    >
                      {column.field === "isBlocked" ? (
                        row.isBlocked ? (
                          <BlockIcon sx={{ color: "red" }} />
                        ) : (
                          <CheckCircleIcon sx={{ color: "green" }} />
                        )
                      ) : (
                        row[column.field] ?? "N/A"
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TableContainer>
    </>
  );
};

export default ReuseTable;
