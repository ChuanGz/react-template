import { addLocalizationTemplate } from '../../templates/localization/index.mjs'

export function addLocalizationCapability(files, options) {
  if (options.localization) addLocalizationTemplate(files)
}
