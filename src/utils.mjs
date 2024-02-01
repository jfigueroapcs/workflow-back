import { createRequire } from 'node:module'
// import.meta.url esta es la direccion del archivo actual
const require = createRequire(import.meta.url)

export const readJSON = (path) => require(path)
