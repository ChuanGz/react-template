export function parseOptionFlags(flags) {
  const options = {}
  for (const flag of flags) {
    if (!flag.startsWith('--') || !flag.includes('='))
      throw new Error(`Invalid option flag: ${flag}; expected --option=value`)
    const [key, ...valueParts] = flag.slice(2).split('=')
    if (!key || valueParts.length === 0)
      throw new Error(`Invalid option flag: ${flag}; expected --option=value`)
    if (key in options) throw new Error(`Duplicate option: ${key}`)
    options[key] = valueParts.join('=')
  }
  return options
}
