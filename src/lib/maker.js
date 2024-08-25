import { def_typescript_file } from "../config.js";
import { formatIconName } from "./utils.js";

export default function iconMaker(name, data, config) {
	const formattedName = formatIconName(name);
	const filename = generateFileName(name, config);

	let content = generateComponent(formattedName, name, data, config);

	return { content, filename };
}

export function generateFileName(name, config) {
	const extension = config.typescript ? "tsx" : "jsx";
	return `${name}.${extension}`;
}

function getRandomData() {
	const colors = ["red", "blue", "green", "yellow", "purple", "orange"];

	const randomColor = colors[Math.floor(Math.random() * colors.length)];
	// Random size between 12 and 100
	const randomSize = Math.floor(Math.random() * (100 - 12 + 1) + 12);

	return { color: randomColor, size: randomSize };
}

function generateComponent(name, type, content, config) {
	content = content
		.replace(/width="24"/g, `width={size ?? ${config.defaultSize}}`)
		.replace(/height="24"/g, `height={size ?? ${config.defaultSize}}`)
		.replace(/stroke="currentColor"/g, 'stroke={color ?? "currentColor"}')
		.replace(
			/stroke-width="2"/g,
			`strokeWidth={${config.defaultStrokeWidth}}`
		)
		.replace(/stroke-linecap="round"/g, 'strokeLinecap="round"')
		.replace(/stroke-linejoin="round"/g, 'strokeLinejoin="round"')
		.replace(
			/>/,
			` {...props} className={\`lucide lucide-${type} \$\{className ? className : ""\}\`} ref={ref}>`
		)
		.replace(/\n/g, " ")
		.replace(/\s+/g, " ")
		.replace(/> </g, "><")
		.replace(/<\/svg> /g, "</svg>");

	const randomData = getRandomData();

	return `import React from 'react';
${
	config.typescript
		? `import { LucideElement, LucideProps } from './${def_typescript_file.replace(
				".d.ts",
				""
		  )}';`
		: ""
}

/**
 * ${name} - \`${type}\`
 *
 * @param {string} color - stroke color of the icon
 * @param {number} size - size of the icon
 * @param {number} strokeWidth - width of the stroke
 * @param {string} className - additional classes for the icon
 * @param {object} props - additional props for the icon based on SVGElement
 * @param {object} ref - reference to the icon
 * @returns {React.Component} ${name} component
 *
 * @example
 * <${name} color="${randomData.color}" size={${randomData.size}} />
 *
 * @see https://lucide.dev/icons/${type}
 */
const ${name}${config.typescript ? ": LucideElement" : ""} = React.forwardRef${
		config.typescript ? "<SVGSVGElement, LucideProps>" : ""
	}(({ className, color, size, ...props }, ref) => (
    ${content}
));

export default ${name};
`;
}
