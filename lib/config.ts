import "dotenv/config";
import _ from "lodash";
import fs from "node:fs";
import path from "node:path";
import type Config from "../config.json";

const file = fs
  .readFileSync(path.resolve(process.cwd(), "config.json"))
  .toString();

const compiled = _.template(file);

export const config: typeof Config = JSON.parse(
  compiled({
    DISCORD_TOKEN: process.env.DISCORD_TOKEN,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
  })
);
