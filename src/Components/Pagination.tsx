import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface PaginationProps {
    count: number;
    page: number;
    onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  }
const PaginationRounded: React.FC<PaginationProps> = ({ count, page, onChange }) => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
};

export default PaginationRounded;
