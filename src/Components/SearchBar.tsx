import { IoSearchOutline } from "react-icons/io5";

interface SearchBarProps {
  handleSearch: () => void;
  search: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}
const SearchBar: React.FC<SearchBarProps> = ({
  handleSearch,
  search,
  setSearchInput,
}) => {
  return (
    <div className="flex w-full space-x-1">
      <input
        type="text"
        className="px-4 py-2 w-80 border-2 rounded "
        placeholder="Search...."
        value={search}
        onChange={(event) => setSearchInput(event.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-800 text-gray-50 text-2xl px-3 py-2 rounded-md"
      >
        <IoSearchOutline />
      </button>
    </div>
  );
};

export default SearchBar;
