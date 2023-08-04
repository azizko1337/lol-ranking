import calculateSummonerPoints from "../../utils/calculateSummonerPoints.js";

test("calculateSummonerPoints", () => {
  const points = calculateSummonerPoints("EMERALD", "IV", 86);
  expect(points).toBe(3186);
});
