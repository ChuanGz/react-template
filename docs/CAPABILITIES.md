# Work with generated capabilities

Generated code is an application-owned baseline, not a runtime framework.

## Capability matrix

The [option contract](engineering/OPTION_CONTRACT.md) is the canonical matrix of
every option, value, default, and owned behavior. The table below identifies the
external package ownership that maintainers must keep isolated.

| Selection            | Runtime package ownership                    | Generated output              |
| -------------------- | -------------------------------------------- | ----------------------------- |
| `state=context`      | None                                         | Context state module          |
| `state=zustand`      | `zustand`                                    | Zustand store                 |
| `uiLibrary=shadcn`   | Radix Slot and class utilities               | Button and `components.json`  |
| `uiLibrary=antd`     | `antd`                                       | Ant Design button adapter     |
| `uiLibrary=mui`      | MUI and Emotion                              | MUI button adapter            |
| `dateTime=date-fns`  | `date-fns`                                   | Date/time helpers             |
| `dateTime=dayjs`     | `dayjs`                                      | Date/time helpers             |
| `utilities=standard` | None                                         | Project-owned focused helpers |
| `utilities=lodash`   | `lodash`                                     | Narrow helper exports         |
| `testing=unit`       | Vitest                                       | Unit test baseline            |
| `testing=component`  | Unit packages plus Testing Library and jsdom | Component test                |
| `testing=e2e`        | Component packages plus Playwright           | Component and E2E tests       |
| `realtime=websocket` | None; browser API                            | Realtime client factory       |
| `realtime=signalr`   | `@microsoft/signalr`                         | SignalR client factory        |
| `realtime=socketio`  | `socket.io-client`                           | Socket.IO client factory      |

Boolean capabilities follow the same rule: selecting `false` emits no owned
dependency or artifact. Shared dependencies such as Zod remain when another
enabled capability still owns them.

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
