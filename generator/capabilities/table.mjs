import { addTableTemplate } from '../../templates/table/index.mjs'

export function addTableCapability(files, options) {
  if (options.table) addTableTemplate(files)
}
