import ora from "ora";

import { raw_api } from "../config.js";

import { getConfig } from "../lib/utils.js";

export default async function test() {
	const config = getConfig();
	if (!config) return;

	const log = ora()
		.info("Initializing test command")
		.start("Testing connection...");

	try {
		const response = await fetch(`${raw_api}README.md`);
		if (response.ok) {
			log.succeed("Testing connection...").succeed("Successful");
		} else {
			log.succeed("Testing connection...").fail(
				"Failed: " + response.statusText
			);
		}
	} catch (error) {
		log.fail("Testing connection...").fail("Failed: " + error.message);
	}
}
