import type { ILibrary } from '../Library';

import { createProvider } from './Provider';
import { createFrame } from './Frame';
import { createContent } from './Content';

export const createModal = (props: ILibrary, useResponsiveStyle) => {
    const Frame = createFrame(props, useResponsiveStyle);
    const Content = createContent(props, useResponsiveStyle);
    const { Provider, useModal } = createProvider(
        props,
        useResponsiveStyle,
        Frame,
        Content
    );

    return {
        Provider,
        useModal
    };
};

export { CUsedAsModalProps } from './UsedAsModal';
