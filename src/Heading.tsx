import type { ILibrary } from './Library';

/**
 * The properties of the Heading-Function
 * Extend the interface here!
 */
export class CHeadingProps /* extends C_SINGLE_Props */ {
    children?:
        | React.ReactElement<any>
        | Array<React.ReactElement<any>>
        | string;

    level: number = 1;
}

/**
 * This is the pure interface version, to be used/exported
 * When using mutliple parent classes, extend here - but then, we need to apply these in the other steps manually, too
 */
export interface IHeadingProps
    extends CHeadingProps /* , C_MULTIPLE1_Props,  C_MULTIPLE2_Props, */ {}

/**
 * The type of an array of the properties
 */
type ArrHeadingProps = Array<
    keyof CHeadingProps
> /* &  Array<keyof C_MULTIPLE1_Props> & C_MULTIPLE2_Props */;

/**
 * An array of the properties
 */
export const propsArray: ArrHeadingProps = Object.keys(
    new CHeadingProps()
) as ArrHeadingProps;

/* multiple parent classes
export const propsArray: ArrHeadingProps = [
    ...Object.keys(new CHeadingProps()),
    ...Object.keys(new C_MULTIPLE1_Props()),
    ...Object.keys(new C_MULTIPLE2_Props()),
 ] as ArrHeadingProps; */

/**
 * Get the properties from a bigger object
 */
export const filterHeadingProps = (props) =>
    propsArray.reduce((r, k) => {
        r[k] = props[k];
        return r;
    }, {}) as IHeadingProps;

export const filterNonHeadingProps = (props: any) =>
    Object.keys(props).reduce((r, k) => {
        if (!propsArray.includes(k as keyof CHeadingProps)) {
            r[k] = props[k];
        }
        return r;
    }, {});

/**
 * What does the Heading -function return
 */
export interface IHeadingResult {}

/**
 * the overall type of the `Heading`-function
 */
type IHeading = (props: IHeadingProps) => JSX.Element;

type ICreateHeading = (props: ILibrary, useResponsiveStyle) => IHeading;

export const createHeading: ICreateHeading = (
    { React, ReactHelmet, ReactRouterDom, ReactFela },
    useResponsiveStyle
) => {
    const Heading: IHeading = (props: IHeadingProps) => {
        const responsiveStyle = useResponsiveStyle();

        const style = responsiveStyle([
            {
                /**
                 * the mobile values
                 */
                fontFamily: 'monospace',

                /**
                 * the tablet values
                 */
                tablet: {},
                /**
                 * the desktop values
                 */
                desktop: {
                    // width: `calc(${breakpoints.desktop}px - 4em)`,
                }
            }
            // unfoldResponsiveUiData(GridUi.minWidthPixel, value => ({ minWidth: `${value}`}))
        ]);

        return React.createElement(
            `h${props.level}`,
            { ...filterNonHeadingProps(props), ...style },
            props.children
        );
    };

    return Heading;
};
