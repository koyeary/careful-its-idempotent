import { standardizeMeasure } from "@/lib/parseIngredients";

describe("standardizeMeasure", () => {
  test("parses simple numeric ounces", () => {
    expect(standardizeMeasure("2 oz")).toBeCloseTo(59.147, 3);
  });

  test("parses fraction ounces", () => {
    expect(standardizeMeasure("1/2 oz")).toBeCloseTo(14.78675, 4);
  });

  test("parses mixed number ounces", () => {
    expect(standardizeMeasure("1 1/2 oz")).toBeCloseTo(44.36025, 4);
  });

  test("handles decimals", () => {
    expect(standardizeMeasure("1.5 oz")).toBeCloseTo(44.36025, 4);
  });

  test("handles extra spaces and unit punctuation", () => {
    expect(standardizeMeasure("  1   oz. ")).toBeCloseTo(29.5735, 4);
  });

  test("handles no space between qty and unit", () => {
    expect(standardizeMeasure("1/2oz")).toBeCloseTo(14.78675, 4);
  });

  test("converts supported units to ml", () => {
    expect(standardizeMeasure("1 cl")).toBeCloseTo(10, 5);
    expect(standardizeMeasure("1 cup")).toBeCloseTo(240, 5);
    expect(standardizeMeasure("1 tbsp")).toBeCloseTo(15, 5);
    expect(standardizeMeasure("1 tsp")).toBeCloseTo(5, 5);
  });

  test("returns undefined for unsupported units", () => {
    expect(standardizeMeasure("1 pinch")).toBeUndefined();
    expect(standardizeMeasure("1 bottle")).toBeUndefined();
  });

  test("returns undefined for non-numeric measures", () => {
    expect(standardizeMeasure("dash")).toBeUndefined();
    expect(standardizeMeasure("to taste")).toBeUndefined();
    expect(standardizeMeasure("")).toBeUndefined();
    expect(standardizeMeasure("abc oz")).toBeUndefined();
  });

  test("returns undefined when unit is missing", () => {
    expect(standardizeMeasure("1")).toBeUndefined();
  });

  test("handles range-style measures conservatively", () => {
    expect(standardizeMeasure("1-2 oz")).toBeUndefined();
  });

  test("ignores 'Juice of ...' style measures", () => {
    expect(standardizeMeasure("Juice of 1/2 lemon")).toBeUndefined();
  });
});
