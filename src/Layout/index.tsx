import { type ILibrary } from '../Library';
import { createTop } from './Top';
import { createHeader } from './Header';
import { createContent } from './Content';
import { createContainer } from './Container';
import { createResponsiveMenu } from './ResponsiveMenu';

export const createLayout = (
    props: ILibrary,
    useBreakpoints,
    useResponsiveStyle
) => ({
    Container: createContainer(props, useBreakpoints),
    Top: createTop(props, useBreakpoints),
    Header: createHeader(props, useBreakpoints),
    Content: createContent(props, useBreakpoints),
    ResponsiveMenu: createResponsiveMenu(props, useResponsiveStyle)
});
