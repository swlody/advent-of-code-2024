import { assertEquals } from "@std/assert";
import { split_once } from "./utils.ts";

interface Equation {
  target: number;
  values: number[];
}

function parse_input(input: string): Equation[] {
  const equations: Equation[] = [];
  for (const line of input.split("\n")) {
    const [target, values] = split_once(line, ": ");
    const value_list = values.split(" ").map(Number);
    equations.push({ target: Number(target), values: value_list });
  }
  return equations;
}

function fake_eval(equation: string): number {
  const parts = equation.split(" ");
  let total = Number(parts[0]);
  for (let i = 1; i < parts.length; i += 2) {
    if (parts[i] === "+") {
      total += Number(parts[i + 1]);
    } else if (parts[i] === "*") {
      total *= Number(parts[i + 1]);
    } else if (parts[i] === "|") {
      total = Number(String(total) + String(Number(parts[i + 1])));
    }
  }
  return total;
}

function solveable_concat(current: number, equation: Equation): string {
  const mult_result = current * equation.values[0];
  const add_result = current + equation.values[0];
  const concat_result = Number(String(current) + String(equation.values[0]));
  if (equation.values.length === 1) {
    if (mult_result === equation.target) {
      return `* ${equation.values[0]}`;
    } else if (add_result === equation.target) {
      return `+ ${equation.values[0]}`;
    } else if (concat_result === equation.target) {
      return `| ${equation.values[0]}`;
    } else {
      return "";
    }
  }

  if (current > equation.target) {
    return "";
  }

  const mult_solution = solveable_concat(mult_result, {
    target: equation.target,
    values: equation.values.slice(1),
  });
  if (mult_solution.length !== 0) {
    return `* ${equation.values[0]} ${mult_solution}`;
  } else {
    const add_solution = solveable_concat(add_result, {
      target: equation.target,
      values: equation.values.slice(1),
    });
    if (add_solution.length !== 0) {
      return `+ ${equation.values[0]} ${add_solution}`;
    } else {
      const concat_solution = solveable_concat(concat_result, {
        target: equation.target,
        values: equation.values.slice(1),
      });
      if (concat_solution.length !== 0) {
        return `| ${equation.values[0]} ${concat_solution}`;
      } else {
        return "";
      }
    }
  }
}

function solveable(current: number, equation: Equation): string {
  const mult_result = current * equation.values[0];
  const add_result = current + equation.values[0];
  if (equation.values.length === 1) {
    if (mult_result === equation.target) {
      return `* ${equation.values[0]}`;
    } else if (add_result === equation.target) {
      return `+ ${equation.values[0]}`;
    } else {
      return "";
    }
  }

  if (current > equation.target) {
    return "";
  }

  const mult_solution = solveable(mult_result, {
    target: equation.target,
    values: equation.values.slice(1),
  });
  if (mult_solution.length !== 0) {
    return `* ${equation.values[0]} ${mult_solution}`;
  } else {
    const add_solution = solveable(add_result, {
      target: equation.target,
      values: equation.values.slice(1),
    });
    if (add_solution.length !== 0) {
      return `+ ${equation.values[0]} ${add_solution}`;
    } else {
      return "";
    }
  }
}

function solve_part1(input: string): number {
  const equations = parse_input(input);

  let total = 0;
  for (const equation of equations) {
    const solved = solveable(equation.values[0], {
      target: equation.target,
      values: equation.values.slice(1),
    });
    if (solved.length !== 0) {
      total += equation.target;
      const final_equation = `${equation.values[0]} ${solved}`;
      // console.log(`${equation.target} = ${final_equation}`);
      assertEquals(equation.target, fake_eval(final_equation));
    }
  }
  return total;
}

function solve_part2(input: string): number {
  const equations = parse_input(input);

  let total = 0;
  for (const equation of equations) {
    const solved = solveable_concat(equation.values[0], {
      target: equation.target,
      values: equation.values.slice(1),
    });
    if (solved.length !== 0) {
      total += equation.target;
      const final_equation = `${equation.values[0]} ${solved}`;
      // console.log(`${equation.target} = ${final_equation}`);
      assertEquals(equation.target, fake_eval(final_equation));
    }
  }
  return total;
}

if (import.meta.main) {
  const input = Deno.readTextFileSync("./input/day07.txt");
  console.log("Day 7 Part 1:");
  console.log(solve_part1(input));

  console.log("Day 1 Part 2:");
  console.log(solve_part2(input));
}

const test_input = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

Deno.test(function test_part1() {
  const solution = solve_part1(test_input);
  assertEquals(3749, solution);
});

Deno.test(function test_part2() {
  const solution = solve_part2(test_input);
  assertEquals(11387, solution);
});
