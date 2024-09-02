#! /usr/bin/env node

import { program } from "commander";
import { cli_version } from "./config.js";

import test from "./commands/test.js";
import init from "./commands/init.js";
import add from "./commands/add.js";
import index from "./commands/index.js";
import list from "./commands/list.js";
import remove from "./commands/remove.js";
import update from "./commands/update.js";
import conf from "./commands/conf.js";

program
	.version(cli_version, "-v, --version", "Output the current version")
	.description(
		"A CLI tool to fetch Lucide icons from GitHub raw files and save it directly to your working directory."
	);

program
	.command("init")
	.description("Initialize the CLI configuration")
	.action(init);

program
	.command("list")
	.alias("ls")
	.alias("l")
	.description("List all icons added to your project")
	.action(list);

program
	.command("add")
	.alias("a")
	.alias("i")
	.alias("install")
	.argument("<icons...>", "icons names to add to your project")
	.description("Add icons to your project")
	.action(add);

program
	.command("index")
	.alias("idx")
	.description("Generate index file for all icons in your project")
	.action(index);

program
	.command("remove")
	.alias("r")
	.alias("rm")
	.alias("d")
	.alias("del")
	.alias("delete")
	.alias("uninstall")
	.argument("<icons...>", "icons names to remove from your project")
	.description("Remove icons from your project")
	.action(remove);

program
	.command("update")
	.alias("u")
	.alias("up")
	.alias("upgrade")
	.alias("refresh")
	.description(
		"Update all icons in your project based on latest configuration"
	)
	.action(update);

program
	.command("config")
	.alias("c")
	.description("Show the current configuration for your project")
	.action(conf);

program
	.command("test")
	.description("Test connection with the server")
	.action(test);

program.parse(process.argv);
