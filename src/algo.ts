import { words } from "./words";

function removeDuplicates(str: string): string {
  var lhs = new Set(str);

  return Array.from(lhs).join("");
}

export function findWords(
  badLetters: string,
  goodLetters: string,
  greenLetters: [string, string, string, string, string]
): { solutions: string[]; state: string } {
  const bad = removeDuplicates(badLetters).toLocaleLowerCase();
  const good = removeDuplicates(
    goodLetters.concat(greenLetters.join(""))
  ).toLocaleLowerCase();
  if (bad.length + good.length === 0) {
    return { solutions: [], state: "no-input" };
  }
  const res = words.filter((word) => {
    const badC = word.split("").some((c) => bad.includes(c));
    const goodC = good.split("").every((c) => word.includes(c));
    if (badC) return false;
    if (goodC) {
      const greenC = greenLetters.every((c, i) => {
        if (c === "") return true;
        if (word.charAt(i) === c.toLocaleLowerCase()) return true;
        return false;
      });
      return greenC && true;
    }
    return false;
  });

  return { solutions: res, state: "with-input" };
}
