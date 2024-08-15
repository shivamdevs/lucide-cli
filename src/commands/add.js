import fs from "fs";
import path from "path";

import ora from "ora";

import { raw_api } from "../config.js";

import iconMaker from "../lib/maker.js";
import { getConfig } from "../lib/utils.js";

export default async function add(icons) {
	const config = getConfig();
	if (!config.isConfigured) return;

	const log = ora();

	if (!icons || !Array.isArray(icons) || icons.length === 0) {
		log.fail("No icons provided").fail("Please provide at least one icon");
		return;
	}

	let iconsAdded = 0;
	let iconsNotFound = 0;
	let iconsNotAdded = 0;

	for (const icon of icons) {
		let iconData;

		log.start(`Adding icon: ${icon}`);

		try {
			const response = await fetch(raw_api + "icons/" + icon + ".svg");

			if (!response.ok) {
				log.fail("Failed to get the icon: " + icon);
				iconsNotFound++;
				continue;
			}

			iconData = await response.text();
		} catch (error) {
			log.fail("Failed to fetch the icon: " + icon);
			iconsNotFound++;
			continue;
		}

		const { content, filename } = iconMaker(icon, iconData, config);

		const savePath = path.join(process.cwd(), config.dir, filename);

		try {
			fs.writeFileSync(savePath, content);
		} catch (error) {
			log.fail("Failed to save the icon: " + icon);
			iconsNotAdded++;
			continue;
		}

		log.succeed(`Added icon: ${icon}`).stop();

		iconsAdded++;
	}

	console.log();

	log.succeed(`${iconsAdded} ${iconsAdded === 1 ? "Icon" : "Icons"} added`);

	if (iconsNotFound > 0) {
		log.warn(
			`${iconsNotFound} ${
				iconsNotFound === 1 ? "Icon" : "Icons"
			} not found on server`
		);
	}

	if (iconsNotAdded > 0) {
		log.fail(
			`${iconsNotAdded} ${
				iconsNotAdded === 1 ? "Icon" : "Icons"
			} not added`
		);
	}

	console.log();
}
