import type { ILibrary } from './Library';

/**
 * The properties of the FloatingButton-Function
 * Extend the interface here!
 */
export class CFloatingButtonProps /* extends C_SINGLE_Props */ {
    children?:
        | React.ReactElement<any>
        | Array<React.ReactElement<any>>
        | string;

    horizontalPos: 'left' | 'right' = 'left';

    render?: () => React.JSX.Element;
}

/**
 * This is the pure interface version, to be used/exported
 * When using mutliple parent classes, extend here - but then, we need to apply these in the other steps manually, too
 */
export interface IFloatingButtonProps
    extends CFloatingButtonProps /* , C_MULTIPLE1_Props,  C_MULTIPLE2_Props, */ {}

/**
 * The type of an array of the properties
 */
type ArrFloatingButtonProps = Array<
    keyof CFloatingButtonProps
> /* &  Array<keyof C_MULTIPLE1_Props> & C_MULTIPLE2_Props */;

/**
 * An array of the properties
 */
export const propsArray: ArrFloatingButtonProps = Object.keys(
    new CFloatingButtonProps()
) as ArrFloatingButtonProps;

/* multiple parent classes
export const propsArray: ArrFloatingButtonProps = [
    ...Object.keys(new CFloatingButtonProps()),
    ...Object.keys(new C_MULTIPLE1_Props()),
    ...Object.keys(new C_MULTIPLE2_Props()),
 ] as ArrFloatingButtonProps; */

/**
 * Get the properties from a bigger object
 */
export const filterFloatingButtonProps = (props) =>
    propsArray.reduce((r, k) => {
        r[k] = props[k];
        return r;
    }, {}) as IFloatingButtonProps;

export const filterNonFloatingButtonProps = (props: any) =>
    Object.keys(props).reduce((r, k) => {
        if (!propsArray.includes(k as keyof CFloatingButtonProps)) {
            r[k] = props[k];
        }
        return r;
    }, {});

/**
 * What does the FloatingButton -function return
 */
export interface IFloatingButtonResult {}

/**
 * the overall type of the `FloatingButton`-function
 */
type IFloatingButton = (props: IFloatingButtonProps) => JSX.Element;

type ICreateFloatingButton = (
    props: ILibrary,
    useResponsiveStyle
) => IFloatingButton;

export const createFloatingButton: ICreateFloatingButton = (
    { React, ReactHelmet, ReactRouterDom, ReactFela },
    useResponsiveStyle
) => {
    const FloatingButton: IFloatingButton = (props: IFloatingButtonProps) => {
        const responsiveStyle = useResponsiveStyle();

        return (
            <div
                {...responsiveStyle([
                    {
                        /**
                         * the mobile values
                         */
                        position: 'fixed',
                        bottom: '30px',

                        cursor: 'pointer',
                        zIndex: 100,

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
                    },
                    props.horizontalPos == 'left'
                        ? {
                              left: '30px'
                          }
                        : {
                              right: '30px'
                          }
                    // unfoldResponsiveUiData(GridUi.minWidthPixel, value => ({ minWidth: `${value}`}))
                ])}
                {...filterNonFloatingButtonProps(props)}
            >
                {props.render !== undefined ? (
                    props.render()
                ) : (
                    <div
                        {...responsiveStyle([
                            {
                                /**
                                 * the mobile values
                                 */
                                width: '50px',
                                height: '50px',
                                borderRadius: '100%',
                                background: '#FF4F79',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',

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
                    >
                        {props.children}
                    </div>
                )}
            </div>
        );
    };

    return FloatingButton;
};
