import fs from "fs";
import path from "path";

import ora from "ora";

import { raw_api } from "../config.js";
import { getConfig } from "../lib/utils.js";
import iconMaker from "../lib/maker.js";

export default async function update() {
	const config = getConfig();
	if (!config.isConfigured) return;

	const log = ora().start("Looking for icons...");

	let icons = [];

	try {
		const iconsDir = path.join(process.cwd(), config.dir);

		const files = fs.readdirSync(iconsDir);

		icons = files.filter((file) => !file.startsWith("index"));

		if (icons.length === 0) {
			log.warn("No icons found in your project");
			console.log();
			return;
		}
	} catch (err) {
		log.fail("Looking for icons...").fail("");
	}

	log.succeed(
		`Found ${icons.length} icon${
			icons.length > 1 ? "s" : ""
		} in your project:`
	).stop();

	console.log();

	let iconsUpdated = 0;
	let iconsNotFound = 0;
	let iconsNotUpdated = 0;

	for (let icon of icons) {
		icon = icon.split(".")[0];

		let iconData;

		log.start(`Updating icon: ${icon}`);

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
			console.log(error);
			iconsNotFound++;
			continue;
		}

		const { content, filename } = iconMaker(icon, iconData, config);

		const savePath = path.join(process.cwd(), config.dir, filename);

		try {
			fs.writeFileSync(savePath, content);
		} catch (error) {
			log.fail("Failed to update the icon: " + icon);
			iconsNotUpdated++;
			continue;
		}

		log.succeed(`Updated icon: ${icon}`).stop();

		iconsUpdated++;
	}

	console.log();

	log.succeed(
		`${iconsUpdated} ${iconsUpdated === 1 ? "Icon" : "Icons"} updated`
	);

	if (iconsNotFound > 0) {
		log.warn(
			`${iconsNotFound} ${
				iconsNotFound === 1 ? "Icon" : "Icons"
			} not found on server`
		);
	}

	if (iconsNotUpdated > 0) {
		log.fail(
			`${iconsNotUpdated} ${
				iconsNotUpdated === 1 ? "Icon" : "Icons"
			} not updated`
		);
	}

	console.log();
}
