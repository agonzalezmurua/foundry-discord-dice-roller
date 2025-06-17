import consola from "consola";
import {
  SlashCommandBuilder,
  type CacheType,
  type ChatInputCommandInteraction,
} from "discord.js";
import { createActor } from "../../database.ts";
import { parseActor } from "../../foundryvtt.ts";
import axios from "axios";

export const slash = new SlashCommandBuilder()
  .setName("sync")
  .setDescription("Adds or updates a foundry character")
  .addAttachmentOption((option) =>
    option
      .setName("input")
      .setDescription("Actor file from foundryvtt")
      .setRequired(true)
  );

export async function handler(
  interaction: ChatInputCommandInteraction<CacheType>
) {
  const { options } = interaction;
  const json = options.getAttachment("input");

  consola.info(json.url);
  consola.info(json.contentType);

  // TODO: Validate that it's a reported JSON

  const file = await axios.get(json.url);

  consola.info(file.data);

  const actor = await createActor(parseActor(file.data));

  await interaction.reply(`"${actor.name}" (${actor.id}) has been created`);
}
