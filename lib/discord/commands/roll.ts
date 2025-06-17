import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { EmbedBuilder } from "@discordjs/builders";
import consola from "consola";
import {
  type CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { getActor } from "../../database.ts";
import { formatNumberForRoll, getSkills } from "../../foundryvtt.ts";

export const slash = new SlashCommandBuilder()
  .setName("roll")
  .setDescription("Rolls for a given character")
  .addStringOption((option) =>
    option
      .setName("character")
      .setDescription("Character to roll as")
      .setAutocomplete(true)
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("skill")
      .setDescription("skill to roll for")
      .setAutocomplete(true)
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("modifier")
      .setDescription("OPtional modifier to add/substract")
  );

export async function handler(
  interaction: ChatInputCommandInteraction<CacheType>
) {
  const character = interaction.options.getString("character");
  const skill = interaction.options.getString("skill");
  const modifier = interaction.options.getString("modifier") ?? "";
  const dice = interaction.options.getString("dice") ?? "1d20";

  consola.log({ character, skill, modifier, dice });

  const actor = await getActor(character);
  const selectedSkill = getSkills().find(({ value }) => value === skill);
  const actorSkill = actor.skills[selectedSkill.value];
  const notation = [dice, formatNumberForRoll(actorSkill), modifier]
    .filter(Boolean)
    .join(" ");

  consola.info("rolling", notation);

  const result = new DiceRoll(notation);

  const embed = new EmbedBuilder()
    .setAuthor({
      name: character,
      iconURL: `https://foundry.colmillodecobre.chinga.casa/${actor.avatar_url}`,
    })
    .addFields(
      { name: "Dice", value: dice, inline: true },
      {
        name: `${selectedSkill.name}`,
        value: `${actorSkill}`,
        inline: true,
      },
      { name: "Modifier", value: modifier || "<none>", inline: true },

      { name: "Result", value: `${result.output}` }
    );
  await interaction.reply({ embeds: [embed] });
}
