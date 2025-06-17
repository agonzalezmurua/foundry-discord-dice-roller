import { it, describe, expect } from "vitest";
import {
  formatNumberForRoll,
  getAbilityModifier,
  getProficiencyBonus,
  parseActor,
} from "./foundryvtt.ts";

describe("formatNumberForRoll()", () => {
  it("should format a positive number with a + sign", () => {
    expect(formatNumberForRoll(3)).toBe("+3");
  });

  it("should format a negative number with a - sign", () => {
    expect(formatNumberForRoll(-3)).toBe("-3");
  });

  it("should format a 0 with a + sign", () => {
    expect(formatNumberForRoll(0)).toBe("+0");
  });
});

describe("getAbilityModifier", () => {
  it.each`
    score | modifier
    ${1}  | ${-5}
    ${2}  | ${-4}
    ${3}  | ${-4}
    ${4}  | ${-3}
    ${5}  | ${-3}
    ${6}  | ${-2}
    ${7}  | ${-2}
    ${8}  | ${-1}
    ${9}  | ${-1}
    ${10} | ${0}
    ${11} | ${0}
    ${12} | ${1}
    ${13} | ${1}
    ${14} | ${2}
    ${15} | ${2}
    ${16} | ${3}
    ${17} | ${3}
    ${18} | ${4}
    ${19} | ${4}
    ${20} | ${5}
    ${21} | ${5}
  `(
    "it having a score of $score, it should have a modifier of $modifier",
    ({ score, modifier }) => {
      expect(getAbilityModifier(score)).toBe(modifier);
    }
  );
});

describe("getProfficiencyBonus()", () => {
  it.each`
    level | bonus
    ${1}  | ${2}
    ${5}  | ${3}
    ${9}  | ${4}
    ${13} | ${5}
    ${17} | ${6}
    ${20} | ${6}
  `(
    "should get profficiency for level $level with a bonus $bonus",
    ({ level, bonus }) => {
      expect(getProficiencyBonus(level)).toBe(bonus);
    }
  );
});

describe("parseActor()", () => {
  it("should parse a basic actor", () => {
    expect(
      parseActor({
        name: "Pedro",
        system: {
          abilities: {
            str: {
              value: 16,
              proficient: 1,
              max: null,
              bonuses: {
                check: "",
                save: "",
              },
              check: {
                roll: {
                  min: null,
                  max: null,
                  mode: 0,
                },
              },
              save: {
                roll: {
                  min: null,
                  max: null,
                  mode: 0,
                },
              },
            },
            dex: {
              value: 12,
              proficient: 0,
              max: null,
              bonuses: {
                check: "",
                save: "",
              },
              check: {
                roll: {
                  min: null,
                  max: null,
                  mode: 0,
                },
              },
              save: {
                roll: {
                  min: null,
                  max: null,
                  mode: 0,
                },
              },
            },
            con: {
              value: 14,
              proficient: 1,
              max: null,
              bonuses: {
                check: "",
                save: "",
              },
              check: {
                roll: {
                  min: null,
                  max: null,
                  mode: 0,
                },
              },
              save: {
                roll: {
                  min: null,
                  max: null,
                  mode: 0,
                },
              },
            },
            int: {
              value: 10,
              proficient: 0,
              max: null,
              bonuses: {
                check: "",
                save: "",
              },
              check: {
                roll: {
                  min: null,
                  max: null,
                  mode: 0,
                },
              },
              save: {
                roll: {
                  min: null,
                  max: null,
                  mode: 0,
                },
              },
            },
            wis: {
              value: 12,
              proficient: 0,
              max: null,
              bonuses: {
                check: "",
                save: "",
              },
              check: {
                roll: {
                  min: null,
                  max: null,
                  mode: 0,
                },
              },
              save: {
                roll: {
                  min: null,
                  max: null,
                  mode: 0,
                },
              },
            },
            cha: {
              value: 12,
              proficient: 0,
              max: null,
              bonuses: {
                check: "",
                save: "",
              },
              check: {
                roll: {
                  min: null,
                  max: null,
                  mode: 0,
                },
              },
              save: {
                roll: {
                  min: null,
                  max: null,
                  mode: 0,
                },
              },
            },
          },

          skills: {
            acr: {
              ability: "dex",
              roll: {
                min: null,
                max: null,
                mode: 0,
              },
              value: 1,
              bonuses: {
                check: "",
                passive: "",
              },
            },
            ani: {
              ability: "wis",
              roll: {
                min: null,
                max: null,
                mode: 0,
              },
              value: 1,
              bonuses: {
                check: "",
                passive: "",
              },
            },
            arc: {
              ability: "int",
              roll: {
                min: null,
                max: null,
                mode: 0,
              },
              value: 0,
              bonuses: {
                check: "",
                passive: "",
              },
            },
            ath: {
              ability: "str",
              roll: {
                min: null,
                max: null,
                mode: 0,
              },
              value: 0,
              bonuses: {
                check: "",
                passive: "",
              },
            },
            dec: {
              ability: "cha",
              roll: {
                min: null,
                max: null,
                mode: 0,
              },
              value: 0,
              bonuses: {
                check: "",
                passive: "",
              },
            },
            his: {
              ability: "int",
              roll: {
                min: null,
                max: null,
                mode: 0,
              },
              value: 0,
              bonuses: {
                check: "",
                passive: "",
              },
            },
            ins: {
              ability: "wis",
              roll: {
                min: null,
                max: null,
                mode: 0,
              },
              value: 0,
              bonuses: {
                check: "",
                passive: "",
              },
            },
            itm: {
              ability: "cha",
              roll: {
                min: null,
                max: null,
                mode: 0,
              },
              value: 0,
              bonuses: {
                check: "",
                passive: "",
              },
            },
            inv: {
              ability: "int",
              roll: {
                min: null,
                max: null,
                mode: 0,
              },
              value: 0,
              bonuses: {
                check: "",
                passive: "",
              },
            },
            med: {
              ability: "wis",
              roll: {
                min: null,
                max: null,
                mode: 0,
              },
              value: 0,
              bonuses: {
                check: "",
                passive: "",
              },
            },
            nat: {
              ability: "int",
              roll: {
                min: null,
                max: null,
                mode: 0,
              },
              value: 0,
              bonuses: {
                check: "",
                passive: "",
              },
            },
            prc: {
              ability: "wis",
              roll: {
                min: null,
                max: null,
                mode: 0,
              },
              value: 1,
              bonuses: {
                check: "",
                passive: "",
              },
            },
            prf: {
              ability: "cha",
              roll: {
                min: null,
                max: null,
                mode: 0,
              },
              value: 0,
              bonuses: {
                check: "",
                passive: "",
              },
            },
            per: {
              ability: "cha",
              roll: {
                min: null,
                max: null,
                mode: 0,
              },
              value: 0,
              bonuses: {
                check: "",
                passive: "",
              },
            },
            rel: {
              ability: "int",
              roll: {
                min: null,
                max: null,
                mode: 0,
              },
              value: 0,
              bonuses: {
                check: "",
                passive: "",
              },
            },
            slt: {
              ability: "dex",
              roll: {
                min: null,
                max: null,
                mode: 0,
              },
              value: 0,
              bonuses: {
                check: "",
                passive: "",
              },
            },
            ste: {
              ability: "dex",
              roll: {
                min: null,
                max: null,
                mode: 0,
              },
              value: 0,
              bonuses: {
                check: "",
                passive: "",
              },
            },
            sur: {
              ability: "wis",
              roll: {
                min: null,
                max: null,
                mode: 0,
              },
              value: 1,
              bonuses: {
                check: "",
                passive: "",
              },
            },
          },
        },
      })
    ).toMatchInlineSnapshot(`
      {
        "abilities": {
          "cha": 12,
          "con": 14,
          "dex": 12,
          "int": 10,
          "str": 16,
          "wis": 12,
        },
        "avatar_url": undefined,
        "name": "Pedro",
        "skills": {
          "acr": 2,
          "ani": 2,
          "arc": 0,
          "ath": 3,
          "dec": 1,
          "his": 0,
          "ins": 1,
          "inv": 0,
          "itm": 1,
          "med": 1,
          "nat": 0,
          "per": 1,
          "prc": 2,
          "prf": 1,
          "rel": 0,
          "slt": 1,
          "ste": 1,
          "sur": 2,
        },
      }
    `);
  });
});
