import { assertEquals } from "@std/assert";

const directions = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
  { x: 1, y: 1 },
  { x: 1, y: -1 },
  { x: -1, y: 1 },
  { x: -1, y: -1 },
];

function parse_input(input: string): string[] {
  return input.split("\n");
}

function solve_part1(lines: string[]): number {
  let xmas_count = 0;
  // bad
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      for (const direction of directions) {
        const x = { x: i + direction.x * 0, y: j + direction.y * 0 };
        const m = { x: i + direction.x * 1, y: j + direction.y * 1 };
        const a = { x: i + direction.x * 2, y: j + direction.y * 2 };
        const s = { x: i + direction.x * 3, y: j + direction.y * 3 };
        if (
          lines[x.x]?.[x.y] === "X" && lines[m.x]?.[m.y] === "M" &&
          lines[a.x]?.[a.y] === "A" && lines[s.x]?.[s.y] === "S"
        ) {
          xmas_count += 1;
        }
      }
    }
  }

  return xmas_count;
}

function solve_part2(lines: string[]): number {
  let xmas_count = 0;
  // double bad
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] === "A") {
        const x = { x: i + 1, y: j + 1 };
        const m = { x: i + 1, y: j - 1 };
        const a = { x: i - 1, y: j + 1 };
        const s = { x: i - 1, y: j - 1 };
        if (
          (lines[x.x]?.[x.y] === lines[m.x]?.[m.y] &&
            lines[a.x]?.[a.y] === lines[s.x]?.[s.y] &&
            lines[x.x]?.[x.y] !== lines[a.x]?.[a.y] &&
            ((lines[x.x]?.[x.y] === "M" && lines[a.x]?.[a.y] === "S") ||
              (lines[x.x]?.[x.y] === "S" && lines[a.x]?.[a.y] === "M"))) ||
          (lines[x.x]?.[x.y] === lines[a.x]?.[a.y] &&
            lines[m.x]?.[m.y] === lines[s.x]?.[s.y] &&
            lines[x.x]?.[x.y] !== lines[m.x]?.[m.y] &&
            ((lines[x.x]?.[x.y] === "S" && lines[m.x]?.[m.y] === "M") || (
              lines[x.x]?.[x.y] === "M" && lines[m.x]?.[m.y] === "S"
            )))
        ) {
          xmas_count += 1;
        }
      }
    }
  }

  return xmas_count;
}

if (import.meta.main) {
  const input = Deno.readTextFileSync("./input/day04.txt");
  const lines = parse_input(input);
  console.log("Day 4 Part 1:");
  console.log(solve_part1(lines));

  console.log("Day 4 Part 2:");
  console.log(solve_part2(lines));
}

const test_input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

Deno.test(function test_part1() {
  const lines = parse_input(test_input);
  const solution = solve_part1(lines);
  assertEquals(18, solution);
});

Deno.test(function test_part2() {
  const lines = parse_input(test_input);
  const solution = solve_part2(lines);
  assertEquals(9, solution);
});
