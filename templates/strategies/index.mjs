// Mutually exclusive strategy templates.
const strategyGenerators = [
  (o) =>
    o.state === 'context'
      ? [
          'src/state/AppState.tsx',
          "import { createContext,useContext,useState,type ReactNode } from 'react'\ntype AppState={ready:boolean;setReady:(ready:boolean)=>void}\nconst Context=createContext<AppState|null>(null)\nexport function AppStateProvider({children}:{children:ReactNode}){const [ready,setReady]=useState(false);return <Context value={{ready,setReady}}>{children}</Context>}\nexport function useAppState(){const value=useContext(Context);if(!value)throw new Error('useAppState requires AppStateProvider');return value}\n",
        ]
      : o.state === 'zustand'
        ? [
            'src/state/appStore.ts',
            "import { create } from 'zustand'\ntype AppState={ready:boolean;setReady:(ready:boolean)=>void}\nexport const useAppStore=create<AppState>(set=>({ready:false,setReady:ready=>set({ready})}))\n",
          ]
        : null,
  (o) =>
    o.dateTime === 'date-fns'
      ? [
          'src/lib/dateTime.ts',
          "import { format,formatDuration as formatParts,intervalToDuration,parseISO } from 'date-fns'\nexport const parseDate=(value:string)=>parseISO(value)\nexport const formatDate=(value:Date,pattern='yyyy-MM-dd')=>format(value,pattern)\nexport const formatDuration=(milliseconds:number)=>formatParts(intervalToDuration({start:0,end:milliseconds}))\n",
        ]
      : o.dateTime === 'dayjs'
        ? [
            'src/lib/dateTime.ts',
            "import dayjs from 'dayjs'\nimport duration from 'dayjs/plugin/duration'\nimport relativeTime from 'dayjs/plugin/relativeTime'\ndayjs.extend(duration)\ndayjs.extend(relativeTime)\nexport const parseDate=(value:string)=>dayjs(value)\nexport const formatDate=(value:Date,pattern='YYYY-MM-DD')=>dayjs(value).format(pattern)\nexport const formatDuration=(milliseconds:number)=>dayjs.duration(milliseconds).humanize()\n",
          ]
        : null,
  (o) =>
    o.utilities === 'standard'
      ? [
          'src/lib/utilities.ts',
          'export const capitalize=(value:string)=>value.length?value[0].toUpperCase()+value.slice(1):value\nexport const clamp=(value:number,min:number,max:number)=>Math.min(max,Math.max(min,value))\nexport const pick=<T extends object,K extends keyof T>(value:T,keys:K[])=>Object.fromEntries(keys.map(key=>[key,value[key]])) as Pick<T,K>\n',
        ]
      : o.utilities === 'lodash'
        ? [
            'src/lib/utilities.ts',
            "export { default as camelCase } from 'lodash/camelCase'\nexport { default as clamp } from 'lodash/clamp'\nexport { default as get } from 'lodash/get'\n",
          ]
        : null,
  (o) => {
    const implementations = {
      websocket:
        'export const createRealtimeClient=(url:string)=>new WebSocket(url)\n',
      signalr:
        "import { HubConnectionBuilder } from '@microsoft/signalr'\nexport const createRealtimeClient=(url:string)=>new HubConnectionBuilder().withUrl(url).withAutomaticReconnect().build()\n",
      socketio:
        "import { io } from 'socket.io-client'\nexport const createRealtimeClient=(url:string)=>io(url,{autoConnect:false})\n",
    }
    return implementations[o.realtime]
      ? ['src/lib/realtime.ts', implementations[o.realtime]]
      : null
  },
]

export function addStrategyCapabilityFiles(files, options) {
  for (const generate of strategyGenerators) {
    const output = generate(options)
    if (output) files.set(...output)
  }
}
