export function addTailwindDependencies(devDependencies, options) {
  if (!options.tailwind) return
  Object.assign(devDependencies, {
    tailwindcss: '^4.3.1',
    '@tailwindcss/vite': '^4.3.1',
  })
}

export function tailwindViteImport(options) {
  return options.tailwind ? ["import tailwindcss from '@tailwindcss/vite'"] : []
}

export const tailwindVitePlugin = (options) =>
  options.tailwind ? ', tailwindcss()' : ''

export const tailwindCssPrefix = (options) =>
  options.tailwind ? '@import "tailwindcss";\n' : ''
