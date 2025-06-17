import consola from "consola";
import {
  ChatInputCommandInteraction,
  Client,
  Events,
  GatewayIntentBits,
  REST,
  Routes,
} from "discord.js";
import "dotenv/config";
import { listActors } from "../database.ts";
import { getAttributes, getSkills } from "../foundryvtt.ts";
import * as commands from "./commands/index.ts";

const autocomplete = {
  character: async function (interaction: ChatInputCommandInteraction) {
    const focusedValue = interaction.options.getFocused();
    const actors = await listActors();
    const choices = actors.map((actor) => actor.name);
    const filtered = choices.filter((choice) =>
      choice.startsWith(focusedValue)
    );

    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    );
  },
  attribute: async function (interaction: ChatInputCommandInteraction) {
    const focusedValue = interaction.options.getFocused();
    const choices = await getAttributes();
    const filtered = choices.filter((choice) =>
      choice.startsWith(focusedValue)
    );

    await interaction.respond(
      filtered.map((choice) => ({ name: choice.toUpperCase(), value: choice }))
    );
  },
  skill: async function (interaction: ChatInputCommandInteraction) {
    const focusedValue = interaction.options.getFocused();
    const skills = await getSkills();
    const filtered = skills.filter((skill) =>
      skill.name.startsWith(focusedValue)
    );

    await interaction.respond(
      filtered.map((skills) => ({ name: skills.name, value: skills.value }))
    );
  },
};

export async function updateAutocomplete(token: string, client_id: string) {
  const rest = new REST({ version: "10" }).setToken(token);

  try {
    const slashes = Object.values(commands).map(({ slash }) => slash);

    await rest.put(Routes.applicationCommands(client_id), {
      body: slashes,
    });

    consola.log("Reloaded application (/) commands");
    consola.log(
      "Slashes",
      slashes.map(({ name }) => `/${name}`)
    );
  } catch (error) {
    consola.error(error);
  }
}

export async function startClient(token: string) {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  client.on("ready", () => {
    consola.log(`Logged in as ${client.user.tag}!`);
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isChatInputCommand()) {
      try {
        const handler = commands[interaction.commandName].handler;

        if (!handler) {
          consola.warn("No command named", interaction.commandName);
          return;
        }

        await handler(interaction);
      } catch (error) {
        consola.error("Failed to run command", error);
      }
    } else if (interaction.isAutocomplete()) {
      try {
        const focusedOption = interaction.options.getFocused(true);
        const handler = autocomplete[focusedOption.name];

        if (!handler) {
          consola.warn("No autocomplete named", interaction.commandName);

          return;
        }

        await handler(interaction);
      } catch (error) {
        consola.error("Failed to autocomplete", error);
      }
    }
  });

  client.login(token);
}
