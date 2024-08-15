import ora from "ora";

import { getConfig } from "../lib/utils.js";

export default async function conf() {
	const config = getConfig();
	if (!config) return;

	const log = ora();

	log.info(config.name + " - " + config.version)
		.info("")
		.info("Current configuration:")
		.info()
		.info("Framework: " + config.framework)
		.info("TypeScript enabled: " + config.typescript)
		.info("Icons directory: " + config.iconsDirectory)
		.stop();

	console.log();
}
