import React, {type FC, type ReactNode} from 'react';
import chalk, {type ForegroundColorName} from 'chalk';
import {type LiteralUnion} from 'type-fest';
import colorize from '../colorize.js';
import {type Styles} from '../styles.js';

export type Props = {
	/**
	 * Change text color. Ink uses chalk under the hood, so all its functionality is supported.
	 */
	readonly color?: LiteralUnion<ForegroundColorName, string>;

	/**
	 * Same as `color`, but for background.
	 */
	readonly backgroundColor?: LiteralUnion<ForegroundColorName, string>;

	/**
	 * Dim the color (emit a small amount of light).
	 */
	// eslint-disable-next-line react/boolean-prop-naming
	readonly dimColor?: boolean;

	/**
	 * Make the text bold.
	 */
	// eslint-disable-next-line react/boolean-prop-naming
	readonly bold?: boolean;

	/**
	 * Make the text italic.
	 */
	// eslint-disable-next-line react/boolean-prop-naming
	readonly italic?: boolean;

	/**
	 * Make the text underlined.
	 */
	// eslint-disable-next-line react/boolean-prop-naming
	readonly underline?: boolean;

	/**
	 * Make the text crossed with a line.
	 */
	// eslint-disable-next-line react/boolean-prop-naming
	readonly strikethrough?: boolean;

	/**
	 * Inverse background and foreground colors.
	 */
	// eslint-disable-next-line react/boolean-prop-naming
	readonly inverse?: boolean;

	/**
	 * This property tells Ink to wrap or truncate text if its width is larger than container.
	 * If `wrap` is passed (by default), Ink will wrap text and split it into multiple lines.
	 * If `truncate-*` is passed, Ink will truncate text instead, which will result in one line of text with the rest cut off.
	 */
	readonly wrap?: Styles['textWrap'];
	readonly children?: ReactNode;
};

/**
 * This component can display text, and change its style to make it colorful, bold, underline, italic or strikethrough.
 */
const Text: FC<Props> = ({
	color,
	backgroundColor,
	dimColor,
	bold,
	italic,
	underline,
	strikethrough,
	inverse,
	wrap,
	children
}) => {
	if (children === undefined || children === null) {
		return null;
	}

	const transform = (children: string): string => {
		if (dimColor) {
			children = chalk.dim(children);
		}

		if (color) {
			children = colorize(children, color, 'foreground');
		}

		if (backgroundColor) {
			children = colorize(children, backgroundColor, 'background');
		}

		if (bold) {
			children = chalk.bold(children);
		}

		if (italic) {
			children = chalk.italic(children);
		}

		if (underline) {
			children = chalk.underline(children);
		}

		if (strikethrough) {
			children = chalk.strikethrough(children);
		}

		if (inverse) {
			children = chalk.inverse(children);
		}

		return children;
	};

	return (
		<ink-text
			style={{flexGrow: 0, flexShrink: 1, flexDirection: 'row', textWrap: wrap}}
			internal_transform={transform}
		>
			{children}
		</ink-text>
	);
};

Text.displayName = 'Text';

Text.defaultProps = {
	dimColor: false,
	bold: false,
	italic: false,
	underline: false,
	strikethrough: false,
	wrap: 'wrap'
};

export default Text;
