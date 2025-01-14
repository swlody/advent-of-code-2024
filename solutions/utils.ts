export function split_once(input: string, split_at: string): [string, string] {
  const index = input.indexOf(split_at);
  if (index === -1) {
    return [input, ""];
  }
  return [input.slice(0, index), input.slice(index + split_at.length)];
}
