# Work with generated capabilities

Generated code is an application-owned baseline, not a runtime framework.

| Capability     | Primary generated artifact       | Integration point                    |
| -------------- | -------------------------------- | ------------------------------------ |
| API client     | `src/lib/apiClient.ts`           | Set `VITE_API_URL`                   |
| API models     | `src/lib/apiModels.ts`           | Type service responses               |
| Query          | `src/lib/queryClient.ts`         | Provider is added at bootstrap       |
| Table          | `src/components/DataTable.tsx`   | Supply typed data and columns        |
| Forms          | `src/components/ExampleForm.tsx` | Replace schema and submit handler    |
| Localization   | `src/lib/i18n.ts`                | Add resources and language selection |
| Charts         | `src/components/SimpleChart.tsx` | Supply label/value data              |
| File upload    | `src/components/FileUpload.tsx`  | Implement transport in `onFiles`     |
| Page templates | `src/pages/`                     | Compose feature-owned content        |
| Theme          | `src/features/theme/theme.ts`    | Call `setTheme` from application UI  |

Authentication and authorization output defines client integration points; it
does not replace server-side token validation or permission enforcement.

## Generated structure

Application bootstrap stays under `src/app`, integrations under `src/lib`,
shared presentation under `src/components`, route-level composition under
`src/pages`, and capability code under `src/features`. Direct imports keep
dependency direction visible; no barrels are generated.
