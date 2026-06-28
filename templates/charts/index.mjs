export function addChartsTemplate(files) {
  files.set(
    'src/components/SimpleChart.tsx',
    'import { Line,LineChart,ResponsiveContainer,Tooltip,XAxis,YAxis } from \'recharts\'\nexport function SimpleChart({data}:{data:{label:string;value:number}[]}){return <div role="img" aria-label="Value trend" style={{height:240}}><ResponsiveContainer width="100%" height="100%"><LineChart data={data}><XAxis dataKey="label"/><YAxis/><Tooltip/><Line dataKey="value" stroke="currentColor"/></LineChart></ResponsiveContainer></div>}\n',
  )
}
