import { assertEquals } from "@std/assert";

interface Vec2 {
  x: number;
  y: number;
}

function parse_input(input: string): [Vec2, Map<string, Vec2[]>] {
  let y = 0;
  const lines = input.trim().split("\n");
  const max_y = lines.length;
  const max_x = lines[0].length;
  const locations = new Map<string, Vec2[]>();

  for (const line of lines) {
    let x = 0;
    for (const char of line) {
      if (char !== ".") {
        const list = locations.get(char);
        if (list) {
          list.push({ x: x, y: y });
        } else {
          locations.set(char, [{ x: x, y: y }]);
        }
      }

      x += 1;
    }

    y += 1;
  }

  return [{ x: max_x, y: max_y }, locations];
}

function solve_part1(max: Vec2, antennae: Map<string, Vec2[]>): number {
  const antinodes = new Set();
  for (const list of antennae.values()) {
    // For each combination of antennae
    for (let i = 0; i < list.length - 1; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const x_diff = list[j].x - list[i].x;
        const y_diff = list[j].y - list[i].y;

        const candidate_a = {
          x: list[i].x + 2 * x_diff,
          y: list[i].y + 2 * y_diff,
        };

        if (
          candidate_a.x >= 0 && candidate_a.x < max.x && candidate_a.y >= 0 &&
          candidate_a.y < max.y
        ) {
          antinodes.add(`${candidate_a.x} ${candidate_a.y}`);
        }

        const candidate_b = { x: list[i].x - x_diff, y: list[i].y - y_diff };
        if (
          candidate_b.x >= 0 && candidate_b.x < max.x && candidate_b.y >= 0 &&
          candidate_b.y < max.y
        ) {
          antinodes.add(`${candidate_b.x} ${candidate_b.y}`);
        }
      }
    }
  }

  return antinodes.size;
}

function solve_part2(max: Vec2, antennae: Map<string, Vec2[]>): number {
  const antinodes: Set<string> = new Set();
  for (const list of antennae.values()) {
    // For each pair of antennae
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const x_diff = list[j].x - list[i].x;
        const y_diff = list[j].y - list[i].y;

        let x = list[j].x;
        let y = list[j].y;
        while (
          x >= 0 && x < max.x && y >= 0 &&
          y < max.y
        ) {
          antinodes.add(`${x} ${y}`);

          x += x_diff;
          y += y_diff;
        }

        x = list[i].x;
        y = list[i].y;
        while (
          x >= 0 && x < max.x && y >= 0 &&
          y < max.y
        ) {
          antinodes.add(`${x} ${y}`);

          x -= x_diff;
          y -= y_diff;
        }
      }
    }
  }

  return antinodes.size;
}

if (import.meta.main) {
  const input = Deno.readTextFileSync("./input/day08.txt");
  console.log("Day 8 Part 1:");
  const [max, antennae] = parse_input(input);
  console.log(solve_part1(max, antennae));

  console.log("Day 8 Part 2:");
  console.log(solve_part2(max, antennae));
}

const test_input = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

Deno.test(function test_part1() {
  const [max, antennae] = parse_input(test_input);
  const solution = solve_part1(max, antennae);
  assertEquals(14, solution);
});

Deno.test(function test_part2() {
  const [max, antennae] = parse_input(test_input);
  const solution = solve_part2(max, antennae);
  assertEquals(34, solution);
});
