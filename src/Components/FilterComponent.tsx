import { Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { searchusers } from "../redux/admin.thunk";
import { setFilter, setSort, setDirection } from "../redux/admin.slice";
import { useSelector } from "react-redux";

interface FilterComponentProps {
  sort: any[];
  filter: any[];
  direction: any[];
}

const FilterComponent: React.FC<FilterComponentProps> = ({ sort, filter, direction }) => {
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [selectedDirection, setSelectedDirection] = useState<string>("");

  const {search} = useSelector((state:RootState)=>state.admin)
  const dispatch = useDispatch<AppDispatch>();

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const newSort = event.target.value;
    setSelectedSort(newSort);
    dispatch(setSort(newSort));
    dispatch(searchusers({ search, sort: newSort, filter: selectedFilter, direction: selectedDirection }));
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    const newFilter = event.target.value;
    setSelectedFilter(newFilter);
    dispatch(setFilter(newFilter));
    dispatch(searchusers({ search, sort: selectedSort, filter: newFilter, direction: selectedDirection }));
  };

  const handleDirectionChange = (event: SelectChangeEvent<string>) => {
    const newDirection = event.target.value;
    setSelectedDirection(newDirection);
    dispatch(setDirection(newDirection));
    dispatch(searchusers({ search, sort: selectedSort, filter: selectedFilter, direction: newDirection }));
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "end", marginBottom: 1 }}>
      <FormControl size="small" sx={{ minWidth: 150, marginRight: 1 }}>
        <InputLabel>Filter by</InputLabel>
        <Select label="Filter by" value={selectedFilter} onChange={handleFilterChange}>
          {filter.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 150, marginRight: 1 }}>
        <InputLabel>Sort by</InputLabel>
        <Select label="Sort by" value={selectedSort} onChange={handleSortChange}>
          {sort.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel>Direction</InputLabel>
        <Select label="Direction" value={selectedDirection} onChange={handleDirectionChange}>
          {direction.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterComponent;
