import fs from "fs";
import path from "path";

import ora from "ora";

import { cli_version, def_config_file } from "../config.js";

import { askForConfigs } from "../lib/utils.js";
import typeDefinitions from "../lib/types.js";

export default async function init() {
	const log = ora().info("Welcome to Lucide CLI");

	const { framework, language, dir } = await askForConfigs();

	if (!dir) {
		log.fail("Invalid directory path");
		return;
	}

	const regex = /^[a-zA-Z0-9-_]+(\/[a-zA-Z0-9-_]+)*$/;
	if (!regex.test(dir)) {
		log.fail("Invalid directory path format");
		return;
	}

	console.log();

	log.start("Creating configuration file...");

	const data = {
		version: cli_version,
		framework,
		typescript: language === "typescript",
		dir,
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

	const iconDir = path.join(process.cwd(), dir);

	try {
		fs.mkdirSync(iconDir, { recursive: true });
		log.succeed("Icon directory created successfully");
	} catch (error) {
		log.fail("Failed to create the icon directory");
		return;
	}

	if (language === "typescript") {
		log.start("Creating TypeScript definitions file...");

		const typesPath = path.join(iconDir, "index.ts");

		try {
			fs.writeFileSync(typesPath, typeDefinitions[framework]);
			log.succeed("TypeScript definitions file created successfully");
		} catch (error) {
			log.fail("Failed to create the TypeScript definitions file");
			return;
		}
	}

	log.succeed("Lucide CLI has been successfully initialized");
	console.log();
}
