import type { ILibrary } from './Library';

export class CBreakpoints /* extends C_SINGLE_Props */ {
    /**
     * the tablet-breakpoint, anything smaller is mobile
     */
    tablet: number = 768;

    /**
     * the desktop-breakpoint, smaller is tablet
     */
    desktop: number = 1200;
}

/**
 * This is the pure interface version, to be used/exported
 * When using mutliple parent classes, extend here - but then, we need to apply these in the other steps manually, too
 */
export interface IBreakpoints
    extends CBreakpoints /* , C_MULTIPLE1_Props,  C_MULTIPLE2_Props, */ {}

/**
 * The type of an array of the properties
 */
type ArrBreakpointsProps = Array<
    keyof CBreakpoints
> /* &  Array<keyof C_MULTIPLE1_Props> & C_MULTIPLE2_Props */;

/**
 * An array of the properties
 */
export const breakpointsArray: ArrBreakpointsProps = Object.keys(
    new CBreakpoints()
) as ArrBreakpointsProps;

/**
 * Get the properties from a bigger object
 */
export const filterBreakpointsProps = (props) =>
    breakpointsArray.reduce((r, k) => {
        r[k] = props[k];
        return r;
    }, {}) as IBreakpoints;

/**
 * The properties of the ResponsiveLayout-Function
 * Extend the interface here!
 */
export class CResponsiveLayoutProps {
    children?: React.ReactElement<any> | Array<React.ReactElement<any>>;
}

/**
 * This is the pure interface version, to be used/exported
 * When using mutliple parent classes, extend here - but then, we need to apply these in the other steps manually, too
 */
export interface IResponsiveLayoutProps
    extends CResponsiveLayoutProps,
        CBreakpoints /* ,  C_MULTIPLE2_Props, */ {}

/**
 * The type of an array of the properties
 */
type ArrResponsiveLayoutProps = Array<
    keyof CResponsiveLayoutProps
> /* &  Array<keyof C_MULTIPLE1_Props> & C_MULTIPLE2_Props */;

/**
 * An array of the properties
 */
export const propsArray: ArrResponsiveLayoutProps = Object.keys(
    new CResponsiveLayoutProps()
) as ArrResponsiveLayoutProps;

/* multiple parent classes
export const propsArray: ArrResponsiveLayoutProps = [
    ...Object.keys(new CResponsiveLayoutProps()),
    ...Object.keys(new C_MULTIPLE1_Props()),
    ...Object.keys(new C_MULTIPLE2_Props()),
] as ArrResponsiveLayoutProps; */

/**
 * Get the properties from a bigger object
 */
export const filterResponsiveLayoutProps = (props) =>
    propsArray.reduce((r, k) => {
        r[k] = props[k];
        return r;
    }, {}) as IResponsiveLayoutProps;

/**
 * the overall type of the `ResponsiveLayout`-function
 */
type IResponsiveLayout = (props: IResponsiveLayoutProps) => JSX.Element;

type ICreateResponsiveLayout = (props: ILibrary) => any; // IResponsiveLayout;

export const createResponsiveLayout: ICreateResponsiveLayout = ({
    React,
    ReactFela,
    deepmerge
}) => {
    const ResponsiveContext = React.createContext(
        filterResponsiveLayoutProps({
            breakpoints: undefined,
            responsiveStyle: undefined
        })
    );
    const useBreakpoints = () => {
        return React.useContext(ResponsiveContext).breakpoints;
    };

    const useResponsiveStyle = () => {
        return React.useContext(ResponsiveContext).responsiveStyle;
    };

    const ResponsiveLayout: IResponsiveLayout = (props) => {
        const { css } = ReactFela.useFela();
        const breakpoints = filterBreakpointsProps(props);
        const responsiveStyle = (styleList) => ({
            className: css(
                parseResponsiveStyle(deepmerge.all(styleList), breakpoints)
            )
        });

        return (
            <ResponsiveContext.Provider
                value={{ breakpoints, responsiveStyle }}
            >
                {props.children}
            </ResponsiveContext.Provider>
        );
    };

    return { ResponsiveLayout, useBreakpoints, useResponsiveStyle };
};

/**
 * reformat the cssObj object so that the keys for tablet and desktop apply
 */
export const parseResponsiveStyle = (cssObj: any, props: IBreakpoints) => {
    const { desktop, tablet, ...root } = cssObj;

    // the order is important here! But this is mixed because we put it all into the `root` object.
    root[`@media screen and (min-width: ${props.tablet}px)`] = tablet;
    root[`@media screen and (min-width: ${props.desktop}px)`] = desktop;

    return root;
};
