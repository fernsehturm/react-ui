import type { ILibrary } from './Library';

/**
 * The properties of the MenuToggle-Function
 * Extend the interface here!
 */
export class CMenuToggleProps /* extends C_SINGLE_Props */ {
    children?:
        | React.ReactElement<any>
        | Array<React.ReactElement<any>>
        | string;

    toggleMenu: (isActive: boolean) => void = () => {};
}

/**
 * This is the pure interface version, to be used/exported
 * When using mutliple parent classes, extend here - but then, we need to apply these in the other steps manually, too
 */
export interface IMenuToggleProps
    extends CMenuToggleProps /* , C_MULTIPLE1_Props,  C_MULTIPLE2_Props, */ {}

/**
 * The type of an array of the properties
 */
type ArrMenuToggleProps = Array<
    keyof CMenuToggleProps
> /* &  Array<keyof C_MULTIPLE1_Props> & C_MULTIPLE2_Props */;

/**
 * An array of the properties
 */
export const propsArray: ArrMenuToggleProps = Object.keys(
    new CMenuToggleProps()
) as ArrMenuToggleProps;

/* multiple parent classes
export const propsArray: ArrMenuToggleProps = [
    ...Object.keys(new CMenuToggleProps()),
    ...Object.keys(new C_MULTIPLE1_Props()),
    ...Object.keys(new C_MULTIPLE2_Props()),
 ] as ArrMenuToggleProps; */

/**
 * Get the properties from a bigger object
 */
export const filterMenuToggleProps = (props) =>
    propsArray.reduce((r, k) => {
        r[k] = props[k];
        return r;
    }, {}) as IMenuToggleProps;

export const filterNonMenuToggleProps = (props: any) =>
    Object.keys(props).reduce((r, k) => {
        if (!propsArray.includes(k as keyof CMenuToggleProps)) {
            r[k] = props[k];
        }
        return r;
    }, {});

/**
 * What does the MenuToggle -function return
 */
export interface IMenuToggleResult {}

/**
 * the overall type of the `MenuToggle`-function
 */
type IMenuToggle = (props: IMenuToggleProps) => JSX.Element;

type ICreateMenuToggle = (props: ILibrary, useResponsiveStyle) => IMenuToggle;

export const createMenuToggle: ICreateMenuToggle = (
    { React, ReactHelmet, ReactRouterDom, ReactFela },
    useResponsiveStyle
) => {
    const MenuToggleSpan = (props) => {
        const responsiveStyle = useResponsiveStyle();

        return (
            <span
                {...responsiveStyle([
                    {
                        /**
                         * the mobile values
                         */
                        display: 'flex',
                        width: '29px',
                        height: '2px',
                        marginBottom: '5px',
                        position: 'relative',
                        background: '#000',
                        borderRadius: '3px',
                        zIndex: 1,
                        transformOrigin: '5px 0px',
                        transition: `transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                        background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                        opacity 0.55s ease`,

                        ':first-child': {
                            transformOrigin: '0% 0%'
                        },

                        ':nth-last-child(2)': {
                            transformOrigin: '0% 100%'
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
                {...props}
            >
                {props.children}
            </span>
        );
    };

    const MenuToggleInput = (props) => {
        const responsiveStyle = useResponsiveStyle();

        return (
            <input
                type="checkbox"
                {...responsiveStyle([
                    {
                        /**
                         * the mobile values
                         */
                        display: 'flex',
                        width: '24px',
                        height: '24px',
                        position: 'absolute',
                        cursor: 'pointer',
                        opacity: 0,
                        zIndex: 2,

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
            </input>
        );
    };

    const MenuToggle: IMenuToggle = (props: IMenuToggleProps) => {
        const responsiveStyle = useResponsiveStyle();

        const { staticStyle } = ReactFela.useFela();

        staticStyle(
            {
                opacity: 1,
                transform: 'rotate(45deg) translate(-3px, -1px)',
                background: '#36383F'
            },
            '#menuToggle input:checked ~ span'
        );

        staticStyle(
            {
                opacity: 0,
                transform: 'rotate(0deg) scale(0.2, 0.2)'
            },
            '#menuToggle input:checked ~ span:nth-last-child(3)'
        );

        staticStyle(
            {
                transform: 'rotate(-45deg) translate(0, -1px)'
            },
            '#menuToggle input:checked ~ span:nth-last-child(2)'
        );

        return (
            <div
                id="menuToggle"
                onClick={(event: any) => {
                    props.toggleMenu(event?.target?.checked ?? false);
                }}
                {...responsiveStyle([
                    {
                        /**
                         * the mobile values
                         */
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        top: '0px',
                        left: '0px',
                        zIndex: 1,
                        '-webkit-user-select': 'none',
                        'user-select': 'none',

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
                {...filterNonMenuToggleProps(props)}
            >
                <MenuToggleInput />
                <MenuToggleSpan></MenuToggleSpan>
                <MenuToggleSpan></MenuToggleSpan>
                <MenuToggleSpan></MenuToggleSpan>
                <span style={{ display: 'none' }}></span>
                {props.children}
            </div>
        );
    };

    return MenuToggle;
};
