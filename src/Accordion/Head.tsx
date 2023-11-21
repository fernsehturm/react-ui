import type { ILibrary } from '../Library';

import { CInsideItemProps } from './InsideItem';
/**
 * The properties of the Head-Function
 * Extend the interface here!
 */
export class CHeadProps extends CInsideItemProps {
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

        const { staticStyle } = ReactFela.useFela();

        return (
            <>
                <input
                    type="checkbox"
                    id={`accordion-head-${props.itemId}`}
                    name={`accordion-head-${props.itemId}`}
                    {...responsiveStyle([
                        {
                            /**
                             * the mobile values
                             */
                            display: 'none',
                            // backgroundColor: "darken(slategray,20%)",

                            ':checked + label': {
                                '> i:before': {
                                    transform:
                                        'translate(5px,8px) rotate(45deg)'
                                },
                                '> i:after': {
                                    transform:
                                        'translate(-5px,8px) rotate(-45deg)'
                                }
                            },

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
                ></input>
                <label
                    htmlFor={`accordion-head-${props.itemId}`}
                    {...responsiveStyle([
                        {
                            /**
                             * the mobile values
                             */
                            position: 'relative',
                            display: 'block',
                            width: '100%',
                            margin: 0,
                            paddingLeft: '30px',
                            // color: "white",
                            cursor: 'pointer',
                            fontWeight: 'bold',

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
                    <i
                        {...responsiveStyle([
                            {
                                /**
                                 * the mobile values
                                 */
                                position: 'absolute',
                                display: 'inline-block',
                                width: '20px',
                                height: '20px',
                                left: '5px',
                                // float: "right",

                                ':before': {
                                    position: 'absolute',
                                    content: '""',
                                    width: '16px',
                                    height: '3px',
                                    backgroundColor: 'black',
                                    transition: 'transform 250ms ease',
                                    transform:
                                        'translate(-5px,8px) rotate(45deg)'
                                },

                                ':after': {
                                    position: 'absolute',
                                    content: '""',
                                    width: '16px',
                                    height: '3px',
                                    backgroundColor: 'black',
                                    transition: 'transform 250ms ease',
                                    transform:
                                        'translate(5px,8px) rotate(-45deg)'
                                },

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
                    ></i>
                    {props.children}
                </label>
            </>
        );
    };

    return Head;
};
