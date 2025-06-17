import { startClient, updateAutocomplete } from "./lib/discord/index.ts";
import { config } from "./lib/config.ts";

updateAutocomplete(config.discord.token, config.discord.client_id);

startClient(config.discord.token);
