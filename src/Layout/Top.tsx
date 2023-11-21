import { type ILibrary } from '../Library';
import { parseResponsiveStyle } from '../ResponsiveLayout';

/**
 * The properties of the Top-Function
 * Extend the interface here!
 */
export class CTopProps /* extends C_SINGLE_Props */ {
    children?: React.ReactElement<any> | Array<React.ReactElement<any>>;

    $setRef?: any;
}

/**
 * This is the pure interface version, to be used/exported
 * When using mutliple parent classes, extend here - but then, we need to apply these in the other steps manually, too
 */
export interface ITopProps
    extends CTopProps /* , C_MULTIPLE1_Props,  C_MULTIPLE2_Props, */ {}

/**
 * The type of an array of the properties
 */
type ArrTopProps = Array<
    keyof CTopProps
> /* &  Array<keyof C_MULTIPLE1_Props> & C_MULTIPLE2_Props */;

/**
 * An array of the properties
 */
export const propsArray: ArrTopProps = Object.keys(
    new CTopProps()
) as ArrTopProps;

/* multiple parent classes
export const propsArray: ArrTopProps = [
    ...Object.keys(new CTopProps()),
    ...Object.keys(new C_MULTIPLE1_Props()),
    ...Object.keys(new C_MULTIPLE2_Props()),
] as ArrTopProps; */

/**
 * Get the properties from a bigger object
 */
export const filterTopProps = (props) =>
    propsArray.reduce((r, k) => {
        r[k] = props[k];
        return r;
    }, {}) as ITopProps;

/**
 * the overall type of the `Top`-function
 */
type ITop = (props: ITopProps) => JSX.Element;

type ICreateTop = (props: ILibrary, useBreakpoints) => ITop;

export const createTop: ICreateTop = (
    { React, ReactHelmet, ReactRouterDom, ReactFela },
    useBreakpoints
) => {
    const Top: ITop = (props: ITopProps) => {
        const breakpoints = useBreakpoints();
        const { css } = ReactFela.useFela();

        const { $setRef, ...propsToPass } = props;

        return (
            <div
                className={css(
                    parseResponsiveStyle(
                        {
                            /**
                             * the mobile values
                             */

                            /**
                             * the tablet values
                             */
                            tablet: {},
                            /**
                             * the desktop values
                             */
                            desktop: {}
                        },
                        breakpoints
                    )
                )}
                {...propsToPass}
            >
                {props.children}
            </div>
        );
    };

    return Top;
};
