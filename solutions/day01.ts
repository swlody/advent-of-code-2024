import { assertEquals } from "@std/assert";

function parse_input(input: string): [number[], number[]] {
  const left_list = [];
  const right_list = [];

  for (const line of input.split("\n")) {
    const [left, right] = line.split("   ");
    left_list.push(parseInt(left));
    right_list.push(parseInt(right));
  }

  return [left_list, right_list];
}

function solve_part1(left: number[], right: number[]): number {
  left.sort();
  right.sort();

  let total_distance = 0;
  for (let i = 0; i < left.length; i++) {
    const distance = Math.abs(left[i] - right[i]);
    total_distance += distance;
  }

  return total_distance;
}

function solve_part2(left: number[], right: number[]): number {
  const right_counts = new Map();
  for (const right_value of right) {
    right_counts.set(right_value, (right_counts.get(right_value) ?? 0) + 1);
  }

  let similarity_score = 0;
  for (const left_value of left) {
    const right_count = right_counts.get(left_value) ?? 0;
    similarity_score += left_value * right_count;
  }

  return similarity_score;
}

if (import.meta.main) {
  const input = Deno.readTextFileSync("./input/day01.txt");
  const [left, right] = parse_input(input);
  console.log("Day 1 Part 1:");
  console.log(solve_part1(left, right));

  console.log("Day 1 Part 2:");
  console.log(solve_part2(left, right));
}

//
// Tests
//

const test_input = `3   4
4   3
2   5
1   3
3   9
3   3`;

Deno.test(function test_part2() {
  const [left_list, right_list] = parse_input(test_input);
  const solution = solve_part1(left_list, right_list);
  assertEquals(11, solution);
});

Deno.test(function test_part2() {
  const [left_list, right_list] = parse_input(test_input);
  const solution = solve_part2(left_list, right_list);
  assertEquals(31, solution);
});
