import React from "react";
import FilterComponent from "./FilterComponent";
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
  sort:any[]
  filter:any[]
  direction:any[]
}

const ReuseableTable: React.FC<TableProps> = ({ columns, data,sort,filter ,direction}) => {
  return (
    <>
      <FilterComponent sort={sort} filter={filter} direction={direction}/>
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
                    <Checkbox />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell
                      key={column.field}
                      sx={{ textAlign: "left", padding: "4px" }}
                    >
                      {row[column.field]}
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

export default ReuseableTable;
