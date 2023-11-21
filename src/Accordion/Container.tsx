import type { ILibrary } from '../Library';

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

export const filterNonContainerProps = (props: any) =>
    Object.keys(props).reduce((r, k) => {
        if (!propsArray.includes(k as keyof CContainerProps)) {
            r[k] = props[k];
        }
        return r;
    }, {});

/**
 * What does the Container -function return
 */
export interface IContainerResult {}

/**
 * the overall type of the `Container`-function
 */
type IContainer = (props: IContainerProps) => JSX.Element;

type ICreateContainer = (props: ILibrary, useResponsiveStyle) => IContainer;

export const createContainer: ICreateContainer = (
    { React, ReactHelmet, ReactRouterDom, ReactFela },
    useResponsiveStyle
) => {
    const Container: IContainer = (props: IContainerProps) => {
        const responsiveStyle = useResponsiveStyle();

        return (
            <div
                {...responsiveStyle([
                    {
                        /**
                         * the mobile values
                         */
                        position: 'relative',
                        // width: "80%",
                        // margin: "50px auto",
                        // boxShadow: "0 0 20px rgba(0,0,0,0.3)",

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
                {...filterNonContainerProps(props)}
            >
                {props.children}
            </div>
        );
    };

    return Container;
};
