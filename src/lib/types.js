const typeDefinitions = {
	react: `import React from "react";

type SVGAttributes = Partial<React.SVGProps<SVGSVGElement>>;
type ElementAttributes = React.RefAttributes<SVGSVGElement> & SVGAttributes;

export interface LucideProps extends ElementAttributes {
    size?: string | number;
    absoluteStrokeWidth?: boolean;
    color?: React.CSSProperties["color"];
}

export type LucideElement = React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>;`,
};

export default typeDefinitions;
