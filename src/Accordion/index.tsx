// see: https://codepen.io/joshuaward/pen/woZwGb

import type { ILibrary } from '../Library';

import { createContent } from './Content';
import { createContainer } from './Container';
import { createItem } from './Item';
import { createHead } from './Head';

export const createAccordion = (props: ILibrary, useResponsiveStyle) => ({
    Container: createContainer(props, useResponsiveStyle),
    Content: createContent(props, useResponsiveStyle),
    Item: createItem(props, useResponsiveStyle),
    Head: createHead(props, useResponsiveStyle)
});
