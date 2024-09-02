import fs from "fs";
import path from "path";
import ora from "ora";

import { formatIconName, getConfig } from "../lib/utils.js";
import { def_typescript_file } from "../config.js";

export default async function index(debug = true) {
	const config = getConfig();
	if (!config) return;

	const log = ora();

	debug && log.start("Looking for icons...");

	try {
		const iconsDir = path.join(process.cwd(), config.iconsDirectory);

		const files = fs.readdirSync(iconsDir);

		const icons = files.filter(
			(file) =>
				!file.startsWith(def_typescript_file) &&
				!file.startsWith("index")
		);

		debug &&
			log
				.succeed("Looking for icons...")
				.stop()
				.succeed(
					`Found ${icons.length} icon${
						icons.length > 1 ? "s" : ""
					} in your project`
				)
				.succeed("");

		const indexFile = path.join(
			iconsDir,
			`index.${config.typescript ? "ts" : "js"}`
		);

		debug && log.start("Updating index file...");

		const iconNames = icons.map((icon) =>
			formatIconName(icon.split(".")[0])
		);

		const indexContent = `${icons
			.map(
				(icon, idx) =>
					`import ${iconNames.at(idx)} from "./${
						icon.split(".")[0]
					}";`
			)
			.join("\n")}

const Lucide = {
${iconNames
	.map((icon) => `    ${icon.replace("Lucide", "")}: ${icon},`)
	.join("\n")}
};

export default Lucide;

export {
${iconNames.map((icon) => `    ${icon},`).join("\n")}
};`;

		fs.writeFileSync(indexFile, indexContent);

		debug &&
			log
				.succeed("Updating index file...")
				.stop()
				.succeed(`Index file updated with ${icons.length} icons`)
				.succeed("");
	} catch (error) {
		log.fail("Failed to read the icons directory").fail(error);
	}
}
