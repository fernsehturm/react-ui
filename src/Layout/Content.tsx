import { type ILibrary } from '../Library';
import { parseResponsiveStyle } from '../ResponsiveLayout';

/**
 * The properties of the Content-Function
 * Extend the interface here!
 */
export class CContentProps /* extends C_SINGLE_Props */ {
    children?:
        | React.ReactElement<any>
        | Array<React.ReactElement<any>>
        | string;

    sticky: number = 0;

    $setRef?: any;
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

/**
 * the overall type of the `Content`-function
 */
type IContent = (props: IContentProps) => JSX.Element;

type ICreateContent = (props: ILibrary, useBreakpoints) => IContent;

export const createContent: ICreateContent = (
    { React, ReactHelmet, ReactRouterDom, ReactFela },
    useBreakpoints
) => {
    const Content: IContent = (props: IContentProps) => {
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
                            // padding: `calc(${props.sticky}px + 16px) 8px  16px  8px`,
                            paddingTop: `calc(${props.sticky}px + 44px)`,

                            /**
                             * the tablet values
                             */
                            tablet: {},
                            /**
                             * the deskContent values
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

    return Content;
};
