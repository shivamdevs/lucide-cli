import fs from "fs";
import path from "path";

import ora from "ora";
import inquirer from "inquirer";

import {
	cli_version,
	def_config_file,
	def_dir,
	supported_frameworks,
	supported_languages,
} from "../config.js";

export function getConfig() {
	let content;
	let data;

	try {
		const filePath = path.join(process.cwd(), def_config_file);
		content = fs.readFileSync(filePath, "utf-8");
	} catch (error) {
		ora()
			.fail(
				"You haven't initialized Lucide CLI for this project yet. Run:"
			)
			.fail("npx lucide-cli@latest init")
			.fail("to initialize the CLI configuration");
		console.log();
		return getInitialConfigJSON();
	}

	try {
		data = JSON.parse(content);
	} catch (error) {
		ora()
			.fail("Failed to parse the configuration file")
			.fail("Please make sure the configuration file is in JSON format");
		console.log();
		return getInitialConfigJSON();
	}

	try {
		if (!data.version) throw new Error("Version not found");
		if (!data.framework) throw new Error("Framework not found");

		if (!supported_frameworks.includes(data.framework)) {
			throw new Error("Invalid framework");
		}

		if (typeof data.typescript !== "boolean") {
			throw new Error("Invalid language");
		}

		return {
			isConfigured: true,
			version: data.version,
			framework: data.framework,
			typescript: data.typescript,
			dir: data.dir,
		};
	} catch (error) {
		ora()
			.fail(error.message)
			.fail("")
			.fail("Failed to read the configuration file")
			.fail("Please make sure the configuration file is correct");
		console.log();
		return getInitialConfigJSON();
	}
}

export function getInitialConfigJSON() {
	return {
		version: cli_version,
		framework: supported_frameworks[0],
		typescript: supported_languages[0] === "typescript",
		dir: "src/components/lucide",
	};
}

export function askForConfigs() {
	return inquirer.prompt([
		{
			type: "list",
			name: "framework",
			message: "Select the framework you are using:",
			choices: supported_frameworks,
		},
		{
			type: "list",
			name: "language",
			message: "Select the language you are using:",
			choices: supported_languages,
		},
		{
			type: "input",
			name: "dir",
			message: "Enter the directory where the icons will be saved:",
			default: def_dir,
		},
	]);
}

export function formatIconName(name) {
	return (
		"Lucide" +
		name
			.split("-")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join("")
	);
}
