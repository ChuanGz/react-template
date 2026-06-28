// Router template fragments and dependency contribution.
export function addRouterDependencies(dependencies, options) {
  if (options.router) dependencies['react-router-dom'] = '^7.18.0'
}

export function routerBootstrapImports(options) {
  return options.router
    ? ["import { BrowserRouter } from 'react-router-dom'"]
    : []
}

export function wrapWithRouter(tree, options) {
  return options.router ? `<BrowserRouter>${tree}</BrowserRouter>` : tree
}
