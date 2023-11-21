import type { ILibrary } from './Library';

/**
 * The properties of the OnlyMobile-Function
 * Extend the interface here!
 */
export class COnlyMobileProps /* extends C_SINGLE_Props */ {
    children: React.ReactElement<any> | Array<React.ReactElement<any>> | string;
}

/**
 * This is the pure interface version, to be used/exported
 * When using mutliple parent classes, extend here - but then, we need to apply these in the other steps manually, too
 */
export interface IOnlyMobileProps
    extends COnlyMobileProps /* , C_MULTIPLE1_Props,  C_MULTIPLE2_Props, */ {}

/**
 * The type of an array of the properties
 */
type ArrOnlyMobileProps = Array<
    keyof COnlyMobileProps
> /* &  Array<keyof C_MULTIPLE1_Props> & C_MULTIPLE2_Props */;

/**
 * An array of the properties
 */
export const propsArray: ArrOnlyMobileProps = Object.keys(
    new COnlyMobileProps()
) as ArrOnlyMobileProps;

/* multiple parent classes
export const propsArray: ArrOnlyMobileProps = [
    ...Object.keys(new COnlyMobileProps()),
    ...Object.keys(new C_MULTIPLE1_Props()),
    ...Object.keys(new C_MULTIPLE2_Props()),
 ] as ArrOnlyMobileProps; */

/**
 * Get the properties from a bigger object
 */
export const filterOnlyMobileProps = (props) =>
    propsArray.reduce((r, k) => {
        r[k] = props[k];
        return r;
    }, {}) as IOnlyMobileProps;

export const filterNonOnlyMobileProps = (props: any) =>
    Object.keys(props).reduce((r, k) => {
        if (!propsArray.includes(k as keyof COnlyMobileProps)) {
            r[k] = props[k];
        }
        return r;
    }, {});

/**
 * What does the OnlyMobile -function return
 */
export interface IOnlyMobileResult {}

/**
 * the overall type of the `OnlyMobile`-function
 */
type IOnlyMobile = (props: IOnlyMobileProps) => JSX.Element;

type ICreateOnlyMobile = (props: ILibrary, useResponsiveStyle) => IOnlyMobile;

export const createOnlyMobile: ICreateOnlyMobile = (
    { React, ReactHelmet, ReactRouterDom, ReactFela },
    useResponsiveStyle
) => {
    const OnlyMobile: IOnlyMobile = (props: IOnlyMobileProps) => {
        const responsiveStyle = useResponsiveStyle();

        return (
            <div
                {...responsiveStyle([
                    {
                        /**
                         * the mobile values
                         */
                        display: 'inline',

                        /**
                         * the tablet values
                         */
                        tablet: {
                            display: 'none'
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
                {...filterNonOnlyMobileProps(props)}
            >
                {props.children}
            </div>
        );
    };

    return OnlyMobile;
};
