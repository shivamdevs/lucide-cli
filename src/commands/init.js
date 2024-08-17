import fs from "fs";
import path from "path";

import ora from "ora";

import {
	cli_name,
	cli_aliases,
	cli_version,
	def_config_file,
	def_size,
	def_stroke_width,
	def_typescript_file,
} from "../config.js";

import { askForConfigs } from "../lib/utils.js";
import typeDefinitions from "../lib/types.js";

export default async function init() {
	const log = ora().info("Welcome to " + cli_name + " - " + cli_version);

	const { framework, isTypeScript, iconsDirectory, size, strokeWidth } =
		await askForConfigs();

	if (!iconsDirectory) {
		log.fail("Invalid directory path");
		return;
	}

	const regex = /^[a-zA-Z0-9-_]+(\/[a-zA-Z0-9-_]+)*$/;
	if (!regex.test(iconsDirectory)) {
		log.fail("Invalid directory path format");
		return;
	}

	const defaultSize =
		!size || Number.isNaN(parseFloat(size)) ? def_size : parseFloat(size);

	const defaultStrokeWidth =
		!strokeWidth || Number.isNaN(parseFloat(strokeWidth))
			? def_stroke_width
			: parseFloat(strokeWidth);

	console.log();

	log.start("Creating configuration file...");

	const data = {
		name: cli_name,
		aliases: cli_aliases,
		version: cli_version,
		framework,
		typescript: isTypeScript === "Yes",
		iconsDirectory,
		defaultSize,
		defaultStrokeWidth,
	};

	try {
		const savePath = path.join(process.cwd(), def_config_file);

		fs.writeFileSync(savePath, JSON.stringify(data, null, 2));

		log.succeed("Configuration file created successfully");
	} catch (error) {
		log.fail("Failed to create the configuration file");
		return;
	}

	log.start("Creating icon directory...");

	const iconDir = path.join(process.cwd(), iconsDirectory);

	try {
		fs.mkdirSync(iconDir, { recursive: true });
		log.succeed("Icon directory created successfully");
	} catch (error) {
		log.fail("Failed to create the icon directory");
		return;
	}

	if (isTypeScript === "Yes") {
		log.start("Creating TypeScript definitions file...");

		const typesPath = path.join(iconDir, def_typescript_file);

		try {
			fs.writeFileSync(typesPath, typeDefinitions[framework]);
			log.succeed("TypeScript definitions file created successfully");
		} catch (error) {
			log.fail("Failed to create the TypeScript definitions file");
			return;
		}
	}

	log.succeed(cli_name + " has been successfully initialized");
	console.log();
}
