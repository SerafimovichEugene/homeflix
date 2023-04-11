export const spent = (fn: () => void) => {
    const t0 = performance.now();
    fn();
    const t1 = performance.now();
    console.log(`--> took = ${(t1 - t0) / 1000} sec`);
}