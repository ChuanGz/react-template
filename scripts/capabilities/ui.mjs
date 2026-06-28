const json = (value) => `${JSON.stringify(value, null, 2)}\n`

export function addUiCapabilityFiles(files, o) {
  if (o.theme === 'light-dark') {
    files.set(
      'src/features/theme/theme.ts',
      "export type Theme='light'|'dark'\nexport function setTheme(theme:Theme){document.documentElement.dataset.theme=theme;localStorage.setItem('theme',theme)}\n",
    )
    files.set(
      'src/features/theme/ThemeToggle.tsx',
      "import { useState } from 'react'\nimport { setTheme,type Theme } from './theme'\nexport function ThemeToggle(){const [theme,setCurrentTheme]=useState<Theme>(()=>localStorage.getItem('theme')==='dark'?'dark':'light');function toggle(){const next=theme==='light'?'dark':'light';setTheme(next);setCurrentTheme(next)}return <button className=\"button\" type=\"button\" aria-label={`Switch to ${theme==='light'?'dark':'light'} theme`} onClick={toggle}>{theme==='light'?'Dark':'Light'} Theme</button>}\n",
    )
  }
  if (o.uiLibrary === 'shadcn') {
    files.set(
      'src/components/ui/Button.tsx',
      "import { Slot } from '@radix-ui/react-slot'\nimport type { ButtonHTMLAttributes } from 'react'\nexport function Button({asChild=false,...props}:ButtonHTMLAttributes<HTMLButtonElement>&{asChild?:boolean}){const Comp=asChild?Slot:'button';return <Comp className=\"rounded bg-blue-600 px-4 py-2 text-white\" {...props}/>}\n",
    )
    files.set(
      'components.json',
      json({
        $schema: 'https://ui.shadcn.com/schema.json',
        style: 'new-york',
        rsc: false,
        tsx: true,
        tailwind: { css: 'src/index.css', baseColor: 'neutral' },
        aliases: { components: './src/components', ui: './src/components/ui' },
      }),
    )
  }
  if (o.uiLibrary === 'antd')
    files.set('src/components/ui/Button.tsx', "export { Button } from 'antd'\n")
  if (o.uiLibrary === 'mui')
    files.set(
      'src/components/ui/Button.tsx',
      "export { Button } from '@mui/material'\n",
    )
}
