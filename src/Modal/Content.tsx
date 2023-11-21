import type { ILibrary } from '../Library';

/**
 * The properties of the Content-Function
 * Extend the interface here!
 */
export class CContentProps /* extends C_SINGLE_Props */ {
    children: React.ReactElement<any> | Array<React.ReactElement<any>> | string;
}

/**
 * This is the pure interface version, to be used/exported
 * When using mutliple parent classes, extend here - but then, we need to apply these in the other steps manually, too
 */
export interface IContentProps
    extends CContentProps /* , C_MULTIPLE1_Props,  C_MULTIPLE2_Props, */ {}

/**
 * The type of an array of the properties
 */
type ArrContentProps = Array<
    keyof CContentProps
> /* &  Array<keyof C_MULTIPLE1_Props> & C_MULTIPLE2_Props */;

/**
 * An array of the properties
 */
export const propsArray: ArrContentProps = Object.keys(
    new CContentProps()
) as ArrContentProps;

/* multiple parent classes
export const propsArray: ArrContentProps = [
    ...Object.keys(new CContentProps()),
    ...Object.keys(new C_MULTIPLE1_Props()),
    ...Object.keys(new C_MULTIPLE2_Props()),
 ] as ArrContentProps; */

/**
 * Get the properties from a bigger object
 */
export const filterContentProps = (props) =>
    propsArray.reduce((r, k) => {
        r[k] = props[k];
        return r;
    }, {}) as IContentProps;

export const filterNonContentProps = (props: any) =>
    Object.keys(props).reduce((r, k) => {
        if (!propsArray.includes(k as keyof CContentProps)) {
            r[k] = props[k];
        }
        return r;
    }, {});

/**
 * What does the Content -function return
 */
export interface IContentResult {}

/**
 * the overall type of the `Content`-function
 */
type IContent = (props: IContentProps) => JSX.Element;

type ICreateContent = (props: ILibrary, useResponsiveStyle) => IContent;

export const createContent: ICreateContent = (
    { React, ReactHelmet, ReactRouterDom, ReactFela },
    useResponsiveStyle
) => {
    const Content: IContent = (props: IContentProps) => {
        const responsiveStyle = useResponsiveStyle();

        return (
            <div
                {...responsiveStyle([
                    {
                        /**
                         * the mobile values
                         */
                        zIndex: 102,
                        // border: "2px solid black",
                        width: '75%',
                        maxWidth: '800px',
                        position: 'fixed',
                        top: '49%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        // padding: "5px",
                        // background: "#FFF",
                        // color: "black",

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
                {...filterNonContentProps(props)}
                onClick={(event) => {
                    event.stopPropagation();
                }}
            >
                {props.children}
            </div>
        );
    };

    return Content;
};
