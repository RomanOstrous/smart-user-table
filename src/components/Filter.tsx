import { Column } from "@tanstack/react-table";
import { DebouncedInput } from "./DebounseFilter";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();

  return (
    <DebouncedInput
      className=""
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Search...`}
      type="text"
      value={(columnFilterValue ?? "") as string}
    />
  );
}
