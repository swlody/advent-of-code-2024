import { assertEquals } from "@std/assert";

type Level = number;
type Report = Level[];

function is_report_safe(report: Report): boolean {
  const increasing = report[0] < report[1];

  for (let i = 0; i < report.length - 1; i++) {
    const difference = report[i + 1] - report[i];
    if ((increasing && difference < 0) || (!increasing && difference > 0)) {
      return false;
    } else {
      const abs_difference = Math.abs(difference);
      if (abs_difference < 1 || abs_difference > 3) {
        return false;
      }
    }
  }

  return true;
}

export function parse_input(input_string: string): Report[] {
  return input_string.split("\n").map((line) =>
    line.split(" ").map((x) => parseInt(x))
  );
}

export function solve_part1(reports: Report[]): number {
  return reports.filter(is_report_safe).length;
}

// AHHH so dumb
function is_any_report_safe(report: Report): boolean {
  if (is_report_safe(report)) {
    return true;
  } else {
    for (let i = 0; i < report.length; i++) {
      const new_report = [...report.slice(0, i), ...report.slice(i + 1)];
      if (is_report_safe(new_report)) {
        return true;
      }
    }
    return false;
  }
}

export function solve_part2(reports: Report[]): number {
  return reports.filter(is_any_report_safe).length;
}

if (import.meta.main) {
  const input_string = Deno.readTextFileSync("./input/day02.txt");
  const reports = parse_input(input_string);
  console.log("Day 2 Part 1:");
  console.log(solve_part1(reports));

  console.log("Day 2 Part 2:");
  console.log(solve_part2(reports));
}

const test_input_string = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

Deno.test(function test_part1() {
  const reports = parse_input(test_input_string);
  const solution = solve_part1(reports);
  assertEquals(2, solution);
});

Deno.test(function test_part2() {
  const reports = parse_input(test_input_string);
  const solution = solve_part2(reports);
  assertEquals(4, solution);
});
