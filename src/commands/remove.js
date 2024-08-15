import fs from "fs";
import path from "path";

import ora from "ora";

import { getConfig } from "../lib/utils.js";
import { generateFileName } from "../lib/maker.js";

export default async function remove(icons) {
	const config = getConfig();
	if (!config) return;

	const log = ora();

	if (!icons || !Array.isArray(icons) || icons.length === 0) {
		log.fail("No icons provided").fail("Please provide at least one icon");
		return;
	}

	let iconsRemoved = 0;
	let iconsNotFound = 0;
	let iconsNotRemoved = 0;

	for (const icon of icons) {
		log.start(`Removing icon: ${icon}`);

		const savePath = path.join(
			process.cwd(),
			config.iconsDirectory,
			generateFileName(icon, config)
		);

		try {
			if (fs.existsSync(savePath)) {
				fs.unlinkSync(savePath);
			} else {
				log.warn("Icon not found: " + icon);
				iconsNotFound++;
				continue;
			}
		} catch (error) {
			log.fail("Failed to remove the icon: " + icon);
			iconsNotRemoved++;
			continue;
		}

		log.succeed(`Removed icon: ${icon}`).stop();

		iconsRemoved++;
	}

	console.log();

	log.succeed(
		`${iconsRemoved} ${
			iconsRemoved === 1 ? "Icon" : "Icons"
		} removed successfully`
	);

	if (iconsNotFound > 0) {
		log.warn(
			`${iconsNotFound} ${
				iconsNotFound === 1 ? "Icon" : "Icons"
			} not found`
		);
	}

	if (iconsNotRemoved > 0) {
		log.fail(
			`${iconsNotRemoved} ${
				iconsNotRemoved === 1 ? "Icon" : "Icons"
			} not removed`
		);
	}

	console.log();
}
