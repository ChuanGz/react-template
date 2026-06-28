export function addExtendedCapabilityFiles(files, o) {
  if (o.localization)
    files.set(
      'src/lib/i18n.ts',
      "import i18n from 'i18next'\nimport { initReactI18next } from 'react-i18next'\nvoid i18n.use(initReactI18next).init({lng:'en',fallbackLng:'en',resources:{en:{translation:{appName:'React Template'}}},interpolation:{escapeValue:false}})\nexport { i18n }\n",
    )
  if (o.table)
    files.set(
      'src/components/DataTable.tsx',
      "import { flexRender,getCoreRowModel,useReactTable,type ColumnDef } from '@tanstack/react-table'\nexport function DataTable<T>({data,columns}:{data:T[];columns:ColumnDef<T>[]}){const table=useReactTable({data,columns,getCoreRowModel:getCoreRowModel()});return <table><thead>{table.getHeaderGroups().map(group=><tr key={group.id}>{group.headers.map(header=><th key={header.id}>{header.isPlaceholder?null:flexRender(header.column.columnDef.header,header.getContext())}</th>)}</tr>)}</thead><tbody>{table.getRowModel().rows.map(row=><tr key={row.id}>{row.getVisibleCells().map(cell=><td key={cell.id}>{flexRender(cell.column.columnDef.cell,cell.getContext())}</td>)}</tr>)}</tbody></table>}\n",
    )
  if (o.forms)
    files.set(
      'src/components/ExampleForm.tsx',
      'import { zodResolver } from \'@hookform/resolvers/zod\'\nimport { useForm } from \'react-hook-form\'\nimport { z } from \'zod\'\nconst schema=z.object({email:z.email()})\ntype Values=z.infer<typeof schema>\nexport function ExampleForm(){const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm<Values>({resolver:zodResolver(schema)});return <form onSubmit={handleSubmit(()=>undefined)}><label htmlFor="email">Email</label><input id="email" type="email" autoComplete="email" spellCheck={false} {...register(\'email\')}/>{errors.email?<p role="alert">{errors.email.message}</p>:null}<button disabled={isSubmitting} type="submit">{isSubmitting?\'Saving…\':\'Save\'}</button></form>}\n',
    )
  if (o.charts)
    files.set(
      'src/components/SimpleChart.tsx',
      'import { Line,LineChart,ResponsiveContainer,Tooltip,XAxis,YAxis } from \'recharts\'\nexport function SimpleChart({data}:{data:{label:string;value:number}[]}){return <div role="img" aria-label="Value trend" style={{height:240}}><ResponsiveContainer width="100%" height="100%"><LineChart data={data}><XAxis dataKey="label"/><YAxis/><Tooltip/><Line dataKey="value" stroke="currentColor"/></LineChart></ResponsiveContainer></div>}\n',
    )
  if (o.fileUpload)
    files.set(
      'src/components/FileUpload.tsx',
      'export function FileUpload({onFiles}:{onFiles:(files:File[])=>void}){return <div><label htmlFor="files">Choose Files</label><input id="files" name="files" type="file" multiple onChange={(event)=>onFiles(Array.from(event.target.files??[]))}/></div>}\n',
    )
  if (o.reusableComponents)
    files.set(
      'src/components/EmptyState.tsx',
      'import type { ReactNode } from \'react\'\nexport function EmptyState({title,description,action}:{title:string;description?:string;action?:ReactNode}){return <section aria-labelledby="empty-title"><h2 id="empty-title">{title}</h2>{description?<p>{description}</p>:null}{action}</section>}\n',
    )
  if (o.pageTemplates) {
    files.set(
      'src/pages/ListPage.tsx',
      "import type { ReactNode } from 'react'\nexport function ListPage({title,actions,children}:{title:string;actions?:ReactNode;children:ReactNode}){return <section><header><h1>{title}</h1>{actions}</header>{children}</section>}\n",
    )
    files.set(
      'src/pages/DetailPage.tsx',
      "import type { ReactNode } from 'react'\nexport function DetailPage({title,children}:{title:string;children:ReactNode}){return <article><h1>{title}</h1>{children}</article>}\n",
    )
  }
}
