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
import { createLink } from './Link';
import { createTextInput } from './Form/TextInput';
import { createRichText } from './Form/RichText';
import { createEmailSvg } from './svg/EmailSvg';
import { createWorldSvg } from './svg/WorldSvg';
import { createUrlSvg } from './svg/UrlSvg';
import { createHeadlineSvg } from './svg/HeadlineSvg';
import { createAsyncButton } from './Form/AsyncButton';
import { createStack } from './Primitives/Stack';


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
        Container: createContainer(props, useBreakpoints, useResponsiveStyle),
        MenuToggle: createMenuToggle(props, useResponsiveStyle),
        OnlyMobile: createOnlyMobile(props, useResponsiveStyle),
        NotOnMobile: createNotOnMobile(props, useResponsiveStyle),
        Accordion: createAccordion(props, useResponsiveStyle),
        Link: createLink(props, useResponsiveStyle),
        Modal: createModal(props, useResponsiveStyle),
        SearchBox: createSearchBox(props, useResponsiveStyle),
        Heading: createHeading(props, useResponsiveStyle),
        Grid: createGrid(props, useResponsiveStyle),
        FloatingButton: createFloatingButton(props, useResponsiveStyle),
        UserInterface: createUserInterface(props),
        Layout: createLayout(props, useBreakpoints, useResponsiveStyle),
        ResponsiveLayout,
        Stack: createStack(props, useResponsiveStyle),
        TextInput: createTextInput(props, useResponsiveStyle),
        RichText: createRichText(props, useResponsiveStyle),
        AsyncButton: createAsyncButton(props),
        EmailSvg: createEmailSvg(props),
        WorldSvg: createWorldSvg(props),
        HeadlineSvg: createHeadlineSvg(props),
        UrlSvg: createUrlSvg(props),
        unfoldResponsiveUiData: createResponsiveUi(props),
        useBreakpoints,
        useResponsiveStyle
    };
};
