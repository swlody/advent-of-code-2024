import { assertEquals } from "@std/assert";

export function parse_input(input_string: string): [number[], number[]] {
  const left_list = [];
  const right_list = [];

  for (const line of input_string.split("\n")) {
    const [left, right] = line.split("   ");
    left_list.push(parseInt(left));
    right_list.push(parseInt(right));
  }

  return [left_list, right_list];
}

export function solve_part1(left_list: number[], right_list: number[]): number {
  left_list.sort();
  right_list.sort();

  let total_distance = 0;
  for (let i = 0; i < left_list.length; i++) {
    const distance = Math.abs(left_list[i] - right_list[i]);
    total_distance += distance;
  }

  return total_distance;
}

export function solve_part2(left_list: number[], right_list: number[]): number {
  const right_counts = new Map();
  for (const right of right_list) {
    right_counts.set(right, (right_counts.get(right) ?? 0) + 1);
  }

  let similarity_score = 0;
  for (const left of left_list) {
    const right_count = right_counts.get(left) ?? 0;
    similarity_score += left * right_count;
  }

  return similarity_score;
}

if (import.meta.main) {
  const input_string = Deno.readTextFileSync("./input/day01.txt");
  const [left_list, right_list] = parse_input(input_string);
  console.log("Day 1 Part 1:");
  console.log(solve_part1(left_list, right_list));

  console.log("Day 1 Part 2:");
  console.log(solve_part2(left_list, right_list));
}

const test_input_string = `3   4
4   3
2   5
1   3
3   9
3   3`;

Deno.test(function test_part2() {
  const [left_list, right_list] = parse_input(test_input_string);
  const solution = solve_part1(left_list, right_list);
  assertEquals(11, solution);
});

Deno.test(function test_part2() {
  const [left_list, right_list] = parse_input(test_input_string);
  const solution = solve_part2(left_list, right_list);
  assertEquals(31, solution);
});
