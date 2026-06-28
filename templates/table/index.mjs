export function addTableTemplate(files) {
  files.set(
    'src/components/DataTable.tsx',
    "import { flexRender,getCoreRowModel,useReactTable,type ColumnDef } from '@tanstack/react-table'\nexport function DataTable<T>({data,columns}:{data:T[];columns:ColumnDef<T>[]}){const table=useReactTable({data,columns,getCoreRowModel:getCoreRowModel()});return <table><thead>{table.getHeaderGroups().map(group=><tr key={group.id}>{group.headers.map(header=><th key={header.id}>{header.isPlaceholder?null:flexRender(header.column.columnDef.header,header.getContext())}</th>)}</tr>)}</thead><tbody>{table.getRowModel().rows.map(row=><tr key={row.id}>{row.getVisibleCells().map(cell=><td key={cell.id}>{flexRender(cell.column.columnDef.cell,cell.getContext())}</td>)}</tr>)}</tbody></table>}\n",
  )
}
