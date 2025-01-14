import { assertEquals } from "@std/assert";
import { split_once } from "./utils.ts";

function parse_input(input: string): [Map<number, number[]>, number[][]] {
  const [rules, updates] = split_once(input, "\n\n");
  const rules_map = new Map();
  for (const rule of rules.split("\n")) {
    const [x, y] = split_once(rule, "|").map(Number);
    if (rules_map.has(y)) {
      rules_map.get(y).push(x);
    } else {
      rules_map.set(y, [x]);
    }
  }

  const updates_list = [];
  for (const update of updates.split("\n")) {
    updates_list.push(update.split(",").map(Number));
  }

  return [rules_map, updates_list];
}

function categorize_updates(
  rules: Map<number, number[]>,
  updates: number[][],
): [number[][], number[][]] {
  const ordered_updates = [];
  const fixed_updates = [];
  let index = 0;

  for (const update of updates) {
    const unmatched = new Map();
    const seen = new Set();
    let correctly_ordered = true;

    for (const page of update) {
      const unmatched_idx = unmatched.get(page);
      if (unmatched_idx !== undefined) {
        correctly_ordered = false;

        update[index] = update[unmatched_idx];
        update[unmatched_idx] = page;

        unmatched.delete(page);
      }

      for (const before of (rules.get(page) ?? [])) {
        if (!seen.has(before) && !unmatched.has(before)) {
          unmatched.set(before, index);
        }
      }
      seen.add(page);
    }

    if (correctly_ordered) {
      ordered_updates.push(update);
    } else {
      fixed_updates.push(update);
    }

    index += 1;
  }

  return [ordered_updates, fixed_updates];
}

function get_midpoint_sum(
  updates: number[][],
): number {
  return updates.reduce(
    (acc, update) => acc + update[Math.floor(update.length / 2)],
    0,
  );
}

if (import.meta.main) {
  const input = Deno.readTextFileSync("./input/day05.txt");
  const [rules, updates] = parse_input(input);
  const [ordered_updates, fixed_updates] = categorize_updates(
    rules,
    updates,
  );
  console.log("Day 5 Part 1:");
  console.log(get_midpoint_sum(ordered_updates));
  console.log("Day 5 Part 2:");
  console.log(get_midpoint_sum(fixed_updates));
}

const test_input = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`;

Deno.test(function test_part1() {
  const [rules, updates] = parse_input(test_input);
  const [ordered_updates, _] = categorize_updates(rules, updates);
  const solution = get_midpoint_sum(ordered_updates);
  assertEquals(143, solution);
});

Deno.test(function test_part2() {
  const [rules, updates] = parse_input(test_input);
  const [_, fixed_updates] = categorize_updates(rules, updates);
  const solution = get_midpoint_sum(fixed_updates);
  assertEquals(0, solution);
});
