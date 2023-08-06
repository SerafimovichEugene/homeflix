export const spent = <T>(fn: () => T) => {
  const t0 = performance.now()
  const result = fn()
  const t1 = performance.now()
  console.log(`--> took = ${(t1 - t0) / 1000} sec`)
  return result
}
