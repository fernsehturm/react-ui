import type { ILibrary } from './Library';

/**
 * The properties of the NotOnMobile-Function
 * Extend the interface here!
 */
export class CNotOnMobileProps /* extends C_SINGLE_Props */ {
    children?:
        | React.ReactElement<any>
        | Array<React.ReactElement<any>>
        | string;
}

/**
 * This is the pure interface version, to be used/exported
 * When using mutliple parent classes, extend here - but then, we need to apply these in the other steps manually, too
 */
export interface INotOnMobileProps
    extends CNotOnMobileProps /* , C_MULTIPLE1_Props,  C_MULTIPLE2_Props, */ {}

/**
 * The type of an array of the properties
 */
type ArrNotOnMobileProps = Array<
    keyof CNotOnMobileProps
> /* &  Array<keyof C_MULTIPLE1_Props> & C_MULTIPLE2_Props */;

/**
 * An array of the properties
 */
export const propsArray: ArrNotOnMobileProps = Object.keys(
    new CNotOnMobileProps()
) as ArrNotOnMobileProps;

/* multiple parent classes
export const propsArray: ArrNotOnMobileProps = [
    ...Object.keys(new CNotOnMobileProps()),
    ...Object.keys(new C_MULTIPLE1_Props()),
    ...Object.keys(new C_MULTIPLE2_Props()),
 ] as ArrNotOnMobileProps; */

/**
 * Get the properties from a bigger object
 */
export const filterNotOnMobileProps = (props) =>
    propsArray.reduce((r, k) => {
        r[k] = props[k];
        return r;
    }, {}) as INotOnMobileProps;

export const filterNonNotOnMobileProps = (props: any) =>
    Object.keys(props).reduce((r, k) => {
        if (!propsArray.includes(k as keyof CNotOnMobileProps)) {
            r[k] = props[k];
        }
        return r;
    }, {});

/**
 * What does the NotOnMobile -function return
 */
export interface INotOnMobileResult {}

/**
 * the overall type of the `NotOnMobile`-function
 */
type INotOnMobile = (props: INotOnMobileProps) => JSX.Element;

type ICreateNotOnMobile = (props: ILibrary, useResponsiveStyle) => INotOnMobile;

export const createNotOnMobile: ICreateNotOnMobile = (
    { React, ReactHelmet, ReactRouterDom, ReactFela },
    useResponsiveStyle
) => {
    const NotOnMobile: INotOnMobile = (props: INotOnMobileProps) => {
        const responsiveStyle = useResponsiveStyle();

        return (
            <div
                {...responsiveStyle([
                    {
                        /**
                         * the mobile values
                         */
                        display: 'none',

                        /**
                         * the tablet values
                         */
                        tablet: {
                            display: 'inline'
                        },
                        /**
                         * the desktop values
                         */
                        desktop: {
                            // width: `calc(${breakpoints.desktop}px - 4em)`,
                        }
                    }
                    // unfoldResponsiveUiData(GridUi.minWidthPixel, value => ({ minWidth: `${value}`}))
                ])}
                {...filterNonNotOnMobileProps(props)}
            >
                {props.children}
            </div>
        );
    };

    return NotOnMobile;
};
