import { type ILibrary } from '../Library';
import { parseResponsiveStyle } from '../ResponsiveLayout';

/**
 * The properties of the ResponsiveMenu-Function
 * Extend the interface here!
 */
export class CResponsiveMenuProps /* extends C_SINGLE_Props */ {
    children?:
        | React.ReactElement<any>
        | Array<React.ReactElement<any>>
        | string;

    showMenu?: boolean;
}

/**
 * This is the pure interface version, to be used/exported
 * When using mutliple parent classes, extend here - but then, we need to apply these in the other steps manually, too
 */
export interface IResponsiveMenuProps
    extends CResponsiveMenuProps /* , C_MULTIPLE1_Props,  C_MULTIPLE2_Props, */ {}

/**
 * The type of an array of the properties
 */
type ArrResponsiveMenuProps = Array<
    keyof CResponsiveMenuProps
> /* &  Array<keyof C_MULTIPLE1_Props> & C_MULTIPLE2_Props */;

/**
 * An array of the properties
 */
export const propsArray: ArrResponsiveMenuProps = Object.keys(
    new CResponsiveMenuProps()
) as ArrResponsiveMenuProps;

/* multiple parent classes
export const propsArray: ArrResponsiveMenuProps = [
    ...Object.keys(new CResponsiveMenuProps()),
    ...Object.keys(new C_MULTIPLE1_Props()),
    ...Object.keys(new C_MULTIPLE2_Props()),
 ] as ArrResponsiveMenuProps; */

/**
 * Get the properties from a bigger object
 */
export const filterNonResponsiveMenuProps = (props) =>
    propsArray.reduce((r, k: keyof CResponsiveMenuProps) => {
        if (!propsArray.includes(k)) {
            r[k] = props[k];
        }
        return r;
    }, {}) as IResponsiveMenuProps;

/**
 * What does the ResponsiveMenu -function return
 */
export interface IResponsiveMenuResult {}

/**
 * the overall type of the `ResponsiveMenu`-function
 */
type IResponsiveMenu = (props: IResponsiveMenuProps) => JSX.Element;

type ICreateResponsiveMenu = (
    props: ILibrary,
    useResponsiveStyle
) => IResponsiveMenu;

export const createResponsiveMenu: ICreateResponsiveMenu = (
    { React, ReactHelmet, ReactRouterDom, ReactFela },
    useResponsiveStyle
) => {
    const MenuUl = (props) => {
        const responsiveStyle = useResponsiveStyle();

        return (
            <ul
                {...responsiveStyle([
                    {
                        /**
                         * the mobile values
                         */
                        listStyleType: 'none',
                        margin: 0,
                        padding: '1em',

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
                {...props}
            >
                {props.children}
            </ul>
        );
    };

    const MenuLi = (props) => {
        const responsiveStyle = useResponsiveStyle();
        const {childType, ...propsToPass} = props;


        return (
            <li
                {...responsiveStyle([
                    {
                        /**
                         * the mobile values
                         */
                        display:
                            props?.childType?.localeCompare?.('NotOnMobile') !=
                            0
                                ? 'block'
                                : 'none',
                        marginBottom: '1em',

                        /**
                         * the tablet values
                         */
                        tablet: {
                            display:
                                props?.childType?.localeCompare?.(
                                    'OnlyMobile'
                                ) != 0
                                    ? 'block'
                                    : 'none'
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
                {...propsToPass}
            >
                {props.children}
            </li>
        );
    };

    const ResponsiveMenu: IResponsiveMenu = (props: IResponsiveMenuProps) => {
        const responsiveStyle = useResponsiveStyle();

        return (
            <nav
                role="navigation"
                {...responsiveStyle([
                    {
                        /**
                         * the mobile values
                         */
                        position: 'fixed',
                        background: '#F5F5F5',
                        height: '100%',
                        width: `90%`,
                        maxWidth: `20rem`,
                        display: props.showMenu == true ? 'block' : 'none',
                        fontFamily: 'monospace, monospace',
                        fontSize: '1rem',

                        // boxShadow: "0 0 10px #DDD",

                        // margin: "-50px 0 0 -50px",
                        /* padding: "50px",
            paddingTop: "125px",
            backgroundColor: "#F5F6FA",
            "-webkit-font-smoothing": "antialiased",
            transformOrigin: "0% 0%",
            transform: "translate(-100%, 0)",
            transition: "transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0)",
            transitionDelay: "2s", */
                        /**
                         * the tablet values
                         */
                        tablet: {
                            width: '20rem',
                            display: 'block'
                        },
                        /**
                         * the desktop values
                         */
                        desktop: {}
                    }
                    // unfoldResponsiveUiData(GridUi.minWidthPixel, value => ({ minWidth: `${value}`}))
                ])}
                {...filterNonResponsiveMenuProps(props)}
            >
                <MenuUl>
                    {React.Children.map(props.children, (child) => (
                        <MenuLi childType={child?.type?.name}>{child}</MenuLi>
                    ))}
                </MenuUl>
            </nav>
        );
    };

    return ResponsiveMenu;
};
