// Authentication and authorization templates.
export function addAuthCapabilityFiles(files, o) {
  if (o.authentication !== 'none')
    files.set(
      'src/features/auth/auth.ts',
      `export type AuthStrategy='${o.authentication}'\nexport interface Identity { subject:string; permissions:string[] }\nexport const authStrategy:AuthStrategy='${o.authentication}'\n`,
    )
  if (o.authorization === 'permission')
    files.set(
      'src/features/auth/can.ts',
      "import type { Identity } from './auth'\nexport const can=(identity:Identity,permission:string)=>identity.permissions.includes(permission)\n",
    )
  if (o.authorization === 'route')
    files.set(
      'src/features/auth/ProtectedRoute.tsx',
      "import type { ReactNode } from 'react'\nimport { Navigate } from 'react-router-dom'\nexport function ProtectedRoute({authenticated,children}:{authenticated:boolean;children:ReactNode}){return authenticated?children:<Navigate to=\"/\" replace/>}\n",
    )
}
