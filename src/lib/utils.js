import fs from "fs";
import path from "path";

import ora from "ora";
import inquirer from "inquirer";

import {
	cli_aliases,
	cli_name,
	cli_version,
	def_config_file,
	def_dir,
	def_size,
	def_stroke_width,
	supported_frameworks,
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
				`You haven't initialized ${cli_name} for this project yet. Run:`
			)
			.fail("npx lucide-cli init")
			.fail("to initialize the CLI configuration");
		console.log();
		return null;
	}

	try {
		data = JSON.parse(content);
	} catch (error) {
		ora()
			.fail("Failed to parse the configuration file")
			.fail("Please make sure the configuration file is in JSON format");
		console.log();
		return null;
	}

	try {
		if (!data.version) throw new Error("Version not found");
		if (!data.framework) throw new Error("Framework not found");

		if (!supported_frameworks.includes(data.framework)) {
			throw new Error("Invalid framework");
		}

		if (typeof data.typescript !== "boolean") {
			throw new Error("Invalid typescript value");
		}
	} catch (error) {
		ora()
			.fail(error.message)
			.fail("")
			.fail("Failed to read the configuration file")
			.fail("Please make sure the configuration file is correct");
		console.log();
		return null;
	}

	if (!data.defaultSize || Number.isNaN(parseFloat(data.defaultSize))) {
		data.defaultSize = def_size;
	}

	if (
		!data.defaultStrokeWidth ||
		Number.isNaN(parseFloat(data.defaultStrokeWidth))
	) {
		data.defaultStrokeWidth = def_stroke_width;
	}

	const configs = {
		name: cli_name,
		aliases: cli_aliases,
		version: cli_version,
		framework: data.framework,
		typescript: data.typescript,
		iconsDirectory: data.iconsDirectory,
		defaultSize: data.defaultSize,
		defaultStrokeWidth: data.defaultStrokeWidth,
	};

	try {
		const savePath = path.join(process.cwd(), def_config_file);

		fs.writeFileSync(savePath, JSON.stringify(configs, null, 2));
	} catch (error) {
		log.fail("Failed to update the configuration file");
		return null;
	}

	return configs;
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
			name: "isTypeScript",
			message: "Are you using TypeScript?",
			choices: ["Yes", "No"],
		},
		{
			type: "input",
			name: "iconsDirectory",
			message: "Where do you want to save the icons?",
			default: def_dir,
		},
		{
			type: "input",
			name: "size",
			message: "What should be icons default size?",
			default: def_size,
		},
		{
			type: "input",
			name: "strokeWidth",
			message: "What should be icons default stroke-width?",
			default: def_stroke_width,
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
