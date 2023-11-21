import type { ILibrary } from '../Library';

/**
 * The properties of the Frame-Function
 * Extend the interface here!
 */
export class CFrameProps /* extends C_SINGLE_Props */ {
    children?:
        | React.ReactElement<any>
        | Array<React.ReactElement<any>>
        | string;
}

/**
 * This is the pure interface version, to be used/exported
 * When using mutliple parent classes, extend here - but then, we need to apply these in the other steps manually, too
 */
export interface IFrameProps
    extends CFrameProps /* , C_MULTIPLE1_Props,  C_MULTIPLE2_Props, */ {}

/**
 * The type of an array of the properties
 */
type ArrFrameProps = Array<
    keyof CFrameProps
> /* &  Array<keyof C_MULTIPLE1_Props> & C_MULTIPLE2_Props */;

/**
 * An array of the properties
 */
export const propsArray: ArrFrameProps = Object.keys(
    new CFrameProps()
) as ArrFrameProps;

/* multiple parent classes
export const propsArray: ArrFrameProps = [
    ...Object.keys(new CFrameProps()),
    ...Object.keys(new C_MULTIPLE1_Props()),
    ...Object.keys(new C_MULTIPLE2_Props()),
 ] as ArrFrameProps; */

/**
 * Get the properties from a bigger object
 */
export const filterFrameProps = (props) =>
    propsArray.reduce((r, k) => {
        r[k] = props[k];
        return r;
    }, {}) as IFrameProps;

export const filterNonFrameProps = (props: any) =>
    Object.keys(props).reduce((r, k) => {
        if (!propsArray.includes(k as keyof CFrameProps)) {
            r[k] = props[k];
        }
        return r;
    }, {});

/**
 * What does the Frame -function return
 */
export interface IFrameResult {}

/**
 * the overall type of the `Frame`-function
 */
type IFrame = (props: IFrameProps) => JSX.Element;

type ICreateFrame = (props: ILibrary, useResponsiveStyle) => IFrame;

export const createFrame: ICreateFrame = (
    { React, ReactHelmet, ReactRouterDom, ReactFela },
    useResponsiveStyle
) => {
    const Frame: IFrame = (props: IFrameProps) => {
        const responsiveStyle = useResponsiveStyle();

        return (
            <div
                {...responsiveStyle([
                    {
                        /**
                         * the mobile values
                         */
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'auto',
                        transition: 'all 0.5s',
                        zIndex: 100,
                        background: '#0006',

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
                {...filterNonFrameProps(props)}
            >
                {props.children}
            </div>
        );
    };

    return Frame;
};
