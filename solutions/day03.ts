import { assertEquals } from "@std/assert";

function solve_part1(memory: string): number {
  const pattern = /mul\((\d+?),(\d+?)\)/g;
  let sum = 0;
  let result;
  while ((result = pattern.exec(memory)) !== null) {
    sum += parseInt(result[1]) * parseInt(result[2]);
  }
  return sum;
}

function solve_part2(memory: string): number {
  const pattern = /mul\((\d+?),(\d+?)\)|(?:don't\(\))|(?:do\(\))/g;
  let sum = 0;
  let result;
  let dont = false;
  while ((result = pattern.exec(memory)) !== null) {
    if (result[0] == "don't()") {
      dont = true;
    } else if (result[0] == "do()") {
      dont = false;
    } else if (!dont) {
      sum += parseInt(result[1]) * parseInt(result[2]);
    }
  }
  return sum;
}

if (import.meta.main) {
  const input = Deno.readTextFileSync("./input/day03.txt");
  console.log("Day 3 Part 1:");
  console.log(solve_part1(input));

  console.log("Day 3 Part 2:");
  console.log(solve_part2(input));
}

Deno.test(function test_part1() {
  const test_input =
    `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
  const solution = solve_part1(test_input);
  assertEquals(161, solution);
});

Deno.test(function test_part2() {
  const test_input =
    `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
  const solution = solve_part2(test_input);
  assertEquals(48, solution);
});
