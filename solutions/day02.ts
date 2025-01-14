import { assertEquals } from "@std/assert";

type Level = number;
type Report = Level[];

function is_report_safe(report: Report): boolean {
  const increasing = report[0] < report[1];
  const min_diff = increasing ? 1 : -3;
  const max_diff = increasing ? 3 : -1;

  for (let i = 0; i < report.length - 1; i++) {
    const difference = report[i + 1] - report[i];
    if (difference < min_diff || difference > max_diff) {
      return false;
    }
  }

  return true;
}

function remove_bad_level(report: Report, index_to_remove: number): Report {
  return [
    ...report.slice(0, index_to_remove),
    ...report.slice(index_to_remove + 1),
  ];
}

function is_report_safe_tolerant(report: Report): boolean {
  for (let i = 0; i < report.length - 1; i++) {
    const difference = report[i + 1] - report[i];
    if (difference < 1 || difference > 3) {
      return is_report_safe(remove_bad_level(report, i)) ||
        is_report_safe(remove_bad_level(report, i + 1));
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

export function solve_part2(reports: Report[]): number {
  let count = 0;
  for (const report of reports) {
    if (
      is_report_safe_tolerant(report) ||
      is_report_safe_tolerant(report.toReversed())
    ) {
      count++;
    }
  }
  return count;
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
