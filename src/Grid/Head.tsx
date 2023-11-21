import type { ILibrary } from '../Library';

/**
 * The properties of the Head-Function
 * Extend the interface here!
 */
export class CHeadProps /* extends C_SINGLE_Props */ {
    children?:
        | React.ReactElement<any>
        | Array<React.ReactElement<any>>
        | string;
}

/**
 * This is the pure interface version, to be used/exported
 * When using mutliple parent classes, extend here - but then, we need to apply these in the other steps manually, too
 */
export interface IHeadProps
    extends CHeadProps /* , C_MULTIPLE1_Props,  C_MULTIPLE2_Props, */ {}

/**
 * The type of an array of the properties
 */
type ArrHeadProps = Array<
    keyof CHeadProps
> /* &  Array<keyof C_MULTIPLE1_Props> & C_MULTIPLE2_Props */;

/**
 * An array of the properties
 */
export const propsArray: ArrHeadProps = Object.keys(
    new CHeadProps()
) as ArrHeadProps;

/* multiple parent classes
export const propsArray: ArrHeadProps = [
    ...Object.keys(new CHeadProps()),
    ...Object.keys(new C_MULTIPLE1_Props()),
    ...Object.keys(new C_MULTIPLE2_Props()),
 ] as ArrHeadProps; */

/**
 * Get the properties from a bigger object
 */
export const filterHeadProps = (props) =>
    propsArray.reduce((r, k) => {
        r[k] = props[k];
        return r;
    }, {}) as IHeadProps;

export const filterNonHeadProps = (props: any) =>
    Object.keys(props).reduce((r, k) => {
        if (!propsArray.includes(k as keyof CHeadProps)) {
            r[k] = props[k];
        }
        return r;
    }, {});

/**
 * What does the Head -function return
 */
export interface IHeadResult {}

/**
 * the overall type of the `Head`-function
 */
type IHead = (props: IHeadProps) => JSX.Element;

type ICreateHead = (props: ILibrary, useResponsiveStyle) => IHead;

export const createHead: ICreateHead = (
    { React, ReactHelmet, ReactRouterDom, ReactFela },
    useResponsiveStyle
) => {
    const Head: IHead = (props: IHeadProps) => {
        const responsiveStyle = useResponsiveStyle();

        return (
            <div
                {...responsiveStyle([
                    {
                        /**
                         * the mobile values
                         */
                        background: '#F5F5F5',

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
                ])}
                {...filterNonHeadProps(props)}
            >
                {props.children}
            </div>
        );
    };

    return Head;
};
