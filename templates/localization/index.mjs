export function addLocalizationTemplate(files) {
  files.set(
    'src/lib/i18n.ts',
    "import i18n from 'i18next'\nimport { initReactI18next } from 'react-i18next'\nvoid i18n.use(initReactI18next).init({lng:'en',fallbackLng:'en',resources:{en:{translation:{appName:'React Template'}}},interpolation:{escapeValue:false}})\nexport { i18n }\n",
  )
}
