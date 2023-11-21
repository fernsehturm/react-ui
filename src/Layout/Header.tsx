import { type ILibrary } from '../Library';
import { parseResponsiveStyle } from '../ResponsiveLayout';

/**
 * The properties of the Header-Function
 * Extend the interface here!
 */
export class CHeaderProps /* extends C_SINGLE_Props */ {
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
export interface IHeaderProps
    extends CHeaderProps /* , C_MULTIPLE1_Props,  C_MULTIPLE2_Props, */ {}

/**
 * The type of an array of the properties
 */
type ArrHeaderProps = Array<
    keyof CHeaderProps
> /* &  Array<keyof C_MULTIPLE1_Props> & C_MULTIPLE2_Props */;

/**
 * An array of the properties
 */
export const propsArray: ArrHeaderProps = Object.keys(
    new CHeaderProps()
) as ArrHeaderProps;

/* multiple parent classes
export const propsArray: ArrHeaderProps = [
    ...Object.keys(new CHeaderProps()),
    ...Object.keys(new C_MULTIPLE1_Props()),
    ...Object.keys(new C_MULTIPLE2_Props()),
] as ArrHeaderProps; */

/**
 * Get the properties from a bigger object
 */
export const filterHeaderProps = (props) =>
    propsArray.reduce((r, k) => {
        r[k] = props[k];
        return r;
    }, {}) as IHeaderProps;

/**
 * the overall type of the `Header`-function
 */
type IHeader = (props: IHeaderProps) => JSX.Element;

type ICreateHeader = (props: ILibrary, useBreakpoints) => IHeader;

export const createHeader: ICreateHeader = (
    { React, ReactHelmet, ReactRouterDom, ReactFela },
    useBreakpoints
) => {
    const Header: IHeader = (props) => {
        const divElement = React.useRef(null);

        React.useEffect(() => {
            if (props.$setRef) {
                props.$setRef(divElement);
            }
        });

        const { css } = ReactFela.useFela();
        const breakpoints = useBreakpoints();
        return (
            <nav
                ref={divElement}
                className={css(
                    parseResponsiveStyle(
                        {
                            /**
                             * the mobile values
                             */
                            padding: '10px 16px',
                            // background: "#FFF1",
                            color: '#f1f1f1',
                            display: 'flex',
                            borderBottom: '2px dashed black',
                            fontFamily: 'monospace, monospace',
                            fontSize: '1rem',

                            /**
                             * the tablet values
                             */
                            tablet: {},
                            /**
                             * the desktop values
                             */
                            desktop: {},
                            ...(props.sticky > 0
                                ? {
                                      position: 'fixed',
                                      top: 0,
                                      width: 'calc(100% - 32px)'
                                  }
                                : {})
                        },
                        breakpoints
                    )
                )}
            >
                {props.children}
            </nav>
        );
    };

    return Header;
};
