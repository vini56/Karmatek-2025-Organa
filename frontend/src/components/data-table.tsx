import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  // TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<T extends Record<string, any>> {
  headers: (keyof T)[];
  data: T[];
  caption?: string;
}
const DataTable = <T extends Record<string, any>>({
  headers,
  data,
  caption = "A list of your recent data.",
}: DataTableProps<T>) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHead key={String(header)}>{String(header)}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, rowIndex) => (
          <TableRow key={rowIndex}>
            {headers.map((header, colIndex) => (
              <TableCell key={`${rowIndex}-${colIndex}`}>
                {item[header] !== undefined ? String(item[header]) : "—"}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      {caption && (
        <TableCaption className="mt-8 text-xs">{caption}</TableCaption>
      )}
    </Table>
  );
};

export default DataTable;
