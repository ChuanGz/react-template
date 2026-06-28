export function addApiDependencies(dependencies, o) {
  if (o.mockApi) dependencies.msw = '^2.7.0'
  if (o.envValidation) dependencies.zod = '^4.3.6'
  if (o.query) dependencies['@tanstack/react-query'] = '^5.101.2'
}

export function addApiCapabilityFiles(files, o) {
  if (o.mockApi) {
    files.set(
      'src/mocks/handlers.ts',
      "import { http,HttpResponse } from 'msw'\nexport const handlers=[http.get('/api/health',()=>HttpResponse.json({status:'ok'}))]\n",
    )
    files.set(
      'src/mocks/browser.ts',
      "import { setupWorker } from 'msw/browser'\nimport { handlers } from './handlers'\nexport const mockWorker=setupWorker(...handlers)\n",
    )
  }
  if (o.apiClient)
    files.set(
      'src/lib/apiClient.ts',
      "export async function apiRequest<T>(path:string, init?:RequestInit):Promise<T>{const response=await fetch(`${import.meta.env.VITE_API_URL ?? ''}${path}`,init);if(!response.ok)throw new Error(`API request failed: ${response.status}`);return response.json() as Promise<T>}\n",
    )
  if (o.envValidation)
    files.set(
      'src/lib/env.ts',
      "import { z } from 'zod'\nconst schema=z.object({VITE_API_URL:z.string().url().optional()})\nexport const env=schema.parse(import.meta.env)\n",
    )
  if (o.apiModels)
    files.set(
      'src/lib/apiModels.ts',
      'export interface BaseResponse<T>{data:T;message?:string;requestId?:string}\nexport interface PageResponse<T> extends BaseResponse<T[]>{page:number;pageSize:number;total:number}\nexport interface ApiError{code:string;message:string;fieldErrors?:Record<string,string[]>}\n',
    )
  if (o.query)
    files.set(
      'src/lib/queryClient.ts',
      "import { QueryClient } from '@tanstack/react-query'\nexport const queryClient=new QueryClient({defaultOptions:{queries:{staleTime:30_000,retry:1}}})\n",
    )
}
