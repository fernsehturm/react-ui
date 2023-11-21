import { type ILibrary } from './Library';

import { createUserInterface } from './UserInterface';
import { createLayout } from './Layout';
import { createResponsiveLayout } from './ResponsiveLayout';

import { createContainer } from './Container';
import { createMenuToggle } from './MenuToggle';
import { createOnlyMobile } from './OnlyMobile';
import { createNotOnMobile } from './NotOnMobile';
import { createAccordion } from './Accordion';
import { createModal } from './Modal';
import { createSearchBox } from './SearchBox';
import { createHeading } from './Heading';
import { createGrid } from './Grid';
import { createFloatingButton } from './FloatingButton';
import { createResponsiveUi } from './ResponsiveUi';

export type { ILibrary } from './Library';

export {
    CUserInterfaceProps,
    filterUserInterfaceProps,
    filterNonUserInterfaceProps,
    type IUserInterfaceProps
} from './UserInterface';

export {};
export { parseResponsiveStyle } from './ResponsiveLayout';

export default (props: ILibrary) => {
    const { ResponsiveLayout, useBreakpoints, useResponsiveStyle } =
        createResponsiveLayout(props);

    return {
        Container: createContainer(props, useResponsiveStyle),
        MenuToggle: createMenuToggle(props, useResponsiveStyle),
        OnlyMobile: createOnlyMobile(props, useResponsiveStyle),
        NotOnMobile: createNotOnMobile(props, useResponsiveStyle),
        Accordion: createAccordion(props, useResponsiveStyle),
        Modal: createModal(props, useResponsiveStyle),
        SearchBox: createSearchBox(props, useResponsiveStyle),
        Heading: createHeading(props, useResponsiveStyle),
        Grid: createGrid(props, useResponsiveStyle),
        FloatingButton: createFloatingButton(props, useResponsiveStyle),
        UserInterface: createUserInterface(props),
        Layout: createLayout(props, useBreakpoints, useResponsiveStyle),
        ResponsiveLayout,
        unfoldResponsiveUiData: createResponsiveUi(props),
        useBreakpoints,
        useResponsiveStyle
    };
};
