import type { ILibrary } from './Library';
/**
 * The properties of the Container-Function
 * Extend the interface here!
 */
export class CContainerProps /* extends C_SINGLE_Props */ {
    children?:
        | React.ReactElement<any>
        | Array<React.ReactElement<any>>
        | string;
}

/**
 * This is the pure interface version, to be used/exported
 * When using mutliple parent classes, extend here - but then, we need to apply these in the other steps manually, too
 */
export interface IContainerProps
    extends CContainerProps /* , C_MULTIPLE1_Props,  C_MULTIPLE2_Props, */ {}

/**
 * The type of an array of the properties
 */
type ArrContainerProps = Array<
    keyof CContainerProps
> /* &  Array<keyof C_MULTIPLE1_Props> & C_MULTIPLE2_Props */;

/**
 * An array of the properties
 */
export const propsArray: ArrContainerProps = Object.keys(
    new CContainerProps()
) as ArrContainerProps;

/* multiple parent classes
export const propsArray: ArrContainerProps = [
    ...Object.keys(new CContainerProps()),
    ...Object.keys(new C_MULTIPLE1_Props()),
    ...Object.keys(new C_MULTIPLE2_Props()),
] as ArrContainerProps; */

/**
 * Get the properties from a bigger object
 */
export const filterContainerProps = (props) =>
    propsArray.reduce((r, k) => {
        r[k] = props[k];
        return r;
    }, {}) as IContainerProps;

/**
 * the overall type of the `Container`-function
 */
type IContainer = (props: IContainerProps) => JSX.Element;

type ICreateContainer = (props: ILibrary, useBreakpoints, useResponsiveStyle) => IContainer;

export const createContainer: ICreateContainer = (
    { React, ReactHelmet, ReactRouterDom, ReactFela },
    useBreakpoints,
    useResponsiveStyle
) => {
    const Container: IContainer = (props: IContainerProps) => {
        const responsiveStyle = useResponsiveStyle();
        const breakpoints = useBreakpoints();

        return (
            <div
                {...responsiveStyle([
                    {
                        /**
                         * the mobile values
                         */
                        margin: '0',
                        padding: '0.1em 1em',
                        fontFamily: 'Literata',
                        // position: "relative",

                        /**
                         * disable horizontal scroll during drag
                         */
                        maxWidth: '100%',
                        overflowX: 'hidden',

                        /**
                         * the tablet values
                         */
                        tablet: {
                            // without a right-hand menu
                            // margin: '0 auto 0 20em'
                            margin: "0 auto",
                            // background: "lightblue",
                        },
                        /**
                         * the desktop values
                         */
                        desktop: {
                            width: `calc(${breakpoints.desktop}px - 4em)`,
                            // background: "yellow",
                        }
                    }
                ])}
            >
                {props.children}
            </div>
        );
    };

    return Container;
};
