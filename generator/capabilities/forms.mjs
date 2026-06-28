import { addFormsTemplate } from '../../templates/forms/index.mjs'

export function addFormsCapability(files, options) {
  if (options.forms) addFormsTemplate(files)
}
