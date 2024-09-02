import fs from "fs";
import path from "path";

import ora from "ora";

import { getConfig } from "../lib/utils.js";
import { def_typescript_file } from "../config.js";
import index from "./index.js";

export default async function list() {
	const config = getConfig();
	if (!config) return;

	const log = ora().start("Looking for icons...");

	try {
		const iconsDir = path.join(process.cwd(), config.iconsDirectory);

		const files = fs.readdirSync(iconsDir);

		const icons = files.filter(
			(file) =>
				!file.startsWith(def_typescript_file) &&
				!file.startsWith("index")
		);

		if (icons.length === 0) {
			log.warn("No icons found in your project");
			console.log();
			return;
		}

		log.succeed("Looking for icons...").stop();

		console.log();

		icons.forEach((icon) => {
			log.info(`- ${icon.split(".")[0]}`);
		});

		index(false);

		console.log();

		log.succeed(
			`Found ${icons.length} icon${
				icons.length > 1 ? "s" : ""
			} in your project`
		);
	} catch (err) {
		log.fail("Looking for icons...").fail("");
	}

	console.log();
}
