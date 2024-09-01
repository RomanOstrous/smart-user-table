import { useEffect, useState } from 'react';

interface SearchProps {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}

const SearchUser: React.FC<SearchProps> = ({ globalFilter, setGlobalFilter }) => {
  const [debouncedFilter, setDebouncedFilter] = useState(globalFilter);

  useEffect(() => {
    const handler = setTimeout(() => {
      setGlobalFilter(debouncedFilter);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedFilter, setGlobalFilter]);

  return (
    <input
      type="text"
      placeholder="Search..."
      value={debouncedFilter}
      onChange={(e) => setDebouncedFilter(e.target.value)}
      className="p-2 mb-4 border"
    />
  );
};

export default SearchUser;
