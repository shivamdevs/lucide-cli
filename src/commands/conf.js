import { cli_version } from "../config";
import { getConfig } from "../lib/utils";

export default async function conf() {
	const config = getConfig();
	if (!config.isConfigured) return;

	const log = ora();

	log.info(config.name + " " + config.version)
		.info("")
		.info("Current configuration:")
		.info("Framework: " + config.framework)
		.info("TypeScript enabled: " + config.typescript)
		.info("Icons directory: " + config.dir)
		.stop();

	console.log();
}
