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
	.command("list")
	.description("List all icons added to your project")
	.action(list);

program
	.command("add <icons...>")
	.description("Add icons to your project")
	.action(add);

program
	.command("remove <icons...>")
	.description("Remove icons from your project")
	.action(remove);

program
	.command("update")
	.description(
		"Update all icons in your project based on latest configuration"
	)
	.action(update);

program
	.command("config")
	.description("Show the current configuration for your project")
	.action(() => {
		console.log("This feature is not implemented yet");
	});

program
	.command("test")
	.description("Test connection with the server")
	.action(test);

program.command("ls").description("Alias for list").action(list);

program.command("install <icons...>").description("Alias for add").action(add);

program
	.command("uninstall <icons...>")
	.description("Alias for remove")
	.action(remove);

program
	.command("delete <icons...>")
	.description("Alias for remove")
	.action(remove);

program.command("refresh").description("Alias for update").action(update);

program.command("upgrade").description("Alias for update").action(update);

program.parse(process.argv);
