import { addChartsTemplate } from '../../templates/charts/index.mjs'

export function addChartsCapability(files, options) {
  if (options.charts) addChartsTemplate(files)
}
