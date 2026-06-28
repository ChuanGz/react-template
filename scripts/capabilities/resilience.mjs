export function addResilienceCapabilityFiles(files, o) {
  if (o.errorBoundary)
    files.set(
      'src/app/ErrorBoundary.tsx',
      'import { Component, type ErrorInfo, type ReactNode } from \'react\'\ntype Props={children:ReactNode;onError?:(error:Error,info:ErrorInfo)=>void}\nexport class ErrorBoundary extends Component<Props,{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return{failed:true}}componentDidCatch(error:Error,info:ErrorInfo){this.props.onError?.(error,info)}render(){return this.state.failed?<main role="alert"><h1>Something went wrong</h1><p>Reload the page or try again.</p><button className="button" type="button" onClick={()=>this.setState({failed:false})}>Try Again</button></main>:this.props.children}}\n',
    )
  if (o.loadingState)
    files.set(
      'src/components/LoadingState.tsx',
      'export function LoadingState({loading}:{loading:boolean}) { return loading ? <p role="status">Loading…</p> : null }\n',
    )
}
