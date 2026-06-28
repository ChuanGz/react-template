import { addChartsCapability } from '../../generator/capabilities/charts.mjs'
import { addFormsCapability } from '../../generator/capabilities/forms.mjs'
import { addLocalizationCapability } from '../../generator/capabilities/localization.mjs'
import { addTableCapability } from '../../generator/capabilities/table.mjs'

// Extended opt-in application templates that do not yet need an independent boundary.
export function addExtendedCapabilityFiles(files, o) {
  addLocalizationCapability(files, o)
  addTableCapability(files, o)
  addFormsCapability(files, o)
  addChartsCapability(files, o)
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
