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

function generateComponent(name, type, content, config) {
	content = content
		.replace(/width="24"/g, 'width={size || "24"}')
		.replace(/height="24"/g, 'height={size || "24"}')
		.replace(/stroke="currentColor"/g, 'stroke={color || "currentColor"}')
		.replace(
			/stroke-width="2"/g,
			"strokeWidth={absoluteStrokeWidth ? 2 : (Number(size) ?? 24) / 12}"
		)
		.replace(/stroke-linecap="round"/g, 'strokeLinecap="round"')
		.replace(/stroke-linejoin="round"/g, 'strokeLinejoin="round"')
		.replace(
			/>/,
			` {...props} className={\`lucide lucide-\$\{${type}\} \$\{className\}\`} ref={ref}>`
		)
		.replace(/\n/g, " ")
		.replace(/\s+/g, " ")
		.replace(/> </g, "><")
		.replace(/<\/svg> /g, "</svg>");

	return `import React from 'react';
${config.typescript ? "import { LucideElement, LucideProps } from './';" : ""}

const ${name}${config.typescript ? ": LucideElement" : ""} = React.forwardRef${
		config.typescript ? "<SVGSVGElement, LucideProps>" : ""
	}(({ absoluteStrokeWidth, className, color, size, ...props }, ref) => (
    ${content}
));

export default ${name};
`;
}
