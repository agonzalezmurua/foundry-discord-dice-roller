import consola from "consola";
import { type Actor } from "./prisma_generated/index.js";

export function getAttributes(): string[] {
  return ["str", "dex", "con", "int", "wis", "cha"];
}

export function getSkills(): Array<{ name: string; value: string }> {
  return [
    { name: "Acrobatics (dex)", value: "acr" },
    { name: "Animal Handling (wis)", value: "ani" },
    { name: "Arcana (int)", value: "arc" },
    { name: "Athletics (str)", value: "ath" },
    { name: "Deception (cha)", value: "dec" },
    { name: "History (int)", value: "his" },
    { name: "Insight (wis)", value: "ins" },
    { name: "Intimidation (cha)", value: "itm" },
    { name: "Investigation (int)", value: "inv" },
    { name: "Medicine (wis)", value: "med" },
    { name: "Nature (int)", value: "nat" },
    { name: "Perception (wis)", value: "prc" },
    { name: "Perfomance (cha)", value: "prf" },
    { name: "Persuasion (cha)", value: "per" },
    { name: "Religion (int)", value: "rel" },
    { name: "Sleight of Hand (dex)", value: "slt" },
    { name: "Stealth (dex)", value: "ste" },
    { name: "Survival (wis)", value: "sur" },
  ];
}

export function getAbilityModifier(value: number) {
  return Math.floor((value - 10) / 2);
}

export function getProficiencyBonus(level: number) {
  if (level <= 4) {
    return 2;
  } else if (level <= 8) {
    return 3;
  } else if (level <= 12) {
    return 4;
  } else if (level <= 16) {
    return 5;
  } else if (level <= 20) {
    return 6;
  }
}

export function formatNumberForRoll(value: number) {
  if (!value) {
    return "";
  }
  const sign = Math.sign(value) >= 0 ? "+" : "-";

  return `${sign}${Math.abs(value)}`;
}

export function parseActor(json: any): Omit<Actor, "id"> {
  const abilities: Record<string, { value: number; proficient: boolean }> =
    Object.fromEntries(
      Object.entries(json.system.abilities).map(
        ([skill, { value, proficient }]) => [
          skill,
          { value, proficient: Boolean(proficient) },
        ]
      )
    );

  const level = getActorTotalLevel(json);
  const skills = Object.fromEntries(
    Object.entries(json.system.skills).map(
      ([skill, { ability: skillAbility, value }]) => {
        const ability = abilities[skillAbility];

        return [
          skill,
          getAbilityModifier(ability.value) +
            (ability.proficient ? getProficiencyBonus(level) : 0) +
            value,
        ];
      }
    )
  );

  return {
    name: json.name,
    level: level,
    avatar_url: json.img,
    abilities: abilities,
    skills: skills,
  };
}

export function getActorTotalLevel(actor: any) {
  const classes: any[] = actor.items.filter((item) => item.type === "class");

  return classes.reduce<number>(
    (prev, current) => prev + current.system.levels,
    0
  );
}
