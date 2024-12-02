import {
  parse_input as parse_day1,
  solve_part1,
  solve_part2,
} from "./solutions/day01.ts";

if (import.meta.main) {
  const input_string = Deno.readTextFileSync("./input/day01.txt");
  const [left_list, right_list] = parse_day1(input_string);
  console.log("Day 1 Part 1:");
  console.log(solve_part1(left_list, right_list));

  console.log("Day 1 Part 2:");
  console.log(solve_part2(left_list, right_list));
}
