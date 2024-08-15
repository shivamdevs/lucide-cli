#! /usr/bin/env node

import { program } from "commander";
import { cli_version } from "./config.js";

import test from "./commands/test.js";
import init from "./commands/init.js";
import add from "./commands/add.js";
import list from "./commands/list.js";
import remove from "./commands/remove.js";
import update from "./commands/update.js";

program
	.version(cli_version)
	.description(
		"A CLI tool to fetch Lucide icons from GitHub raw files and save it directly to your working directory."
	);

program
	.command("init")
	.description("Initialize the CLI configuration")
	.action(init);

program
	.commands(["list", "l", "ls"])
	.description("List all icons added to your project")
	.action(list);

program
	.commands([
		"add <icons...>",
		"a <icons...>",
		"i <icons...>",
		"install <icons...>",
	])
	.description("Add icons to your project")
	.action(add);

program
	.commands([
		"remove <icons...>",
		"r <icons...>",
		"rm <icons...>",
		"d <icons...>",
		"del <icons...>",
		"delete <icons...>",
	])
	.description("Remove icons from your project")
	.action(remove);

program
	.commands(["update", "u", "up", "upgrade", "refresh"])
	.description(
		"Update all icons in your project based on latest configuration"
	)
	.action(update);

program
	.commands(["config", "c"])
	.description("Show the current configuration for your project")
	.action(() => {
		console.log("This feature is not implemented yet");
	});

program
	.commands(["test"])
	.description("Test connection with the server")
	.action(test);

program.parse(process.argv);
