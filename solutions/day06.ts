import { assertEquals } from "@std/assert";

enum Space {
  Free,
  Obstacle,
}

enum Facing {
  Up,
  Right,
  Down,
  Left,
}

function turn(facing: Facing): Facing {
  switch (facing) {
    case Facing.Up:
      return Facing.Right;
    case Facing.Right:
      return Facing.Down;
    case Facing.Down:
      return Facing.Left;
    case Facing.Left:
      return Facing.Up;
  }
}

// 0, 0 is top left
function move_forward(x: number, y: number, facing: Facing): [number, number] {
  switch (facing) {
    case Facing.Up:
      return [x, y - 1];
    case Facing.Right:
      return [x + 1, y];
    case Facing.Down:
      return [x, y + 1];
    case Facing.Left:
      return [x - 1, y];
  }
}

function parse_input(input: string): [Space[][], [number, number]] {
  const rows = [];
  let [start_x, start_y] = [0, 0];
  let [x, y] = [0, 0];
  for (const line of input.split("\n")) {
    x = 0;
    const row = [];
    for (const char of line) {
      if (char === "#") {
        row.push(Space.Obstacle);
      } else {
        if (char == "^") {
          [start_x, start_y] = [x, y];
        }
        row.push(Space.Free);
      }
      x += 1;
    }
    rows.push(row);
    y += 1;
  }
  return [rows, [start_x, start_y]];
}

function solve_part1(map: Space[][], starting_pos: [number, number]): number {
  let [x, y] = starting_pos;
  let facing = Facing.Up;
  const visited = new Set();

  while (true) {
    visited.add(`${x},${y}`);
    const [new_x, new_y] = move_forward(x, y, facing);

    if (
      new_x < 0 || new_x >= map[0].length || new_y < 0 || new_y >= map.length
    ) {
      break;
    } else if (map[new_y][new_x] === Space.Free) {
      x = new_x;
      y = new_y;
    } else {
      facing = turn(facing);
    }
  }

  return visited.size;
}

function solve_part2(input: string): number {
  return Number(input);
}

if (import.meta.main) {
  const input = Deno.readTextFileSync("./input/day06.txt");
  console.log("Day 1 Part 1:");
  const [map, starting_pos] = parse_input(input);
  console.log(solve_part1(map, starting_pos));
}

const test_input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

Deno.test(function test_part1() {
  const [map, starting_pos] = parse_input(test_input);
  const solution = solve_part1(map, starting_pos);
  assertEquals(41, solution);
});

Deno.test(function test_part2() {
  const test_input = `0`;
  const solution = solve_part2(test_input);
  assertEquals(0, solution);
});
