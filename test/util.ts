export const checkBuffer = (uint8Array: Uint8Array, hexStr: string) => {
  expect(Buffer.from(uint8Array).toString('hex')).toBe(hexStr);
};
