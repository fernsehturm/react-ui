import type { ILibrary } from '../Library';

/**
 * The properties of the Item-Function
 * Extend the interface here!
 */
export class CItemProps /* extends C_SINGLE_Props */ {
    // children?: React.ReactElement<any> | Array<React.ReactElement<any>> | String;
    value: string = '';
}

/**
 * This is the pure interface version, to be used/exported
 * When using mutliple parent classes, extend here - but then, we need to apply these in the other steps manually, too
 */
export interface IItemProps
    extends CItemProps /* , C_MULTIPLE1_Props,  C_MULTIPLE2_Props, */ {}

/**
 * The type of an array of the properties
 */
type ArrItemProps = Array<
    keyof CItemProps
> /* &  Array<keyof C_MULTIPLE1_Props> & C_MULTIPLE2_Props */;

/**
 * An array of the properties
 */
export const propsArray: ArrItemProps = Object.keys(
    new CItemProps()
) as ArrItemProps;

/* multiple parent classes
export const propsArray: ArrItemProps = [
    ...Object.keys(new CItemProps()),
    ...Object.keys(new C_MULTIPLE1_Props()),
    ...Object.keys(new C_MULTIPLE2_Props()),
 ] as ArrItemProps; */

/**
 * Get the properties from a bigger object
 */
export const filterItemProps = (props) =>
    propsArray.reduce((r, k) => {
        r[k] = props[k];
        return r;
    }, {}) as IItemProps;

export const filterNonItemProps = (props: any) =>
    Object.keys(props).reduce((r, k) => {
        if (!propsArray.includes(k as keyof CItemProps)) {
            r[k] = props[k];
        }
        return r;
    }, {});

/**
 * What does the Item -function return
 */
export interface IItemResult {}

/**
 * the overall type of the `Item`-function
 */
type IItem = (props: IItemProps) => JSX.Element;

type ICreateItem = (props: ILibrary, useResponsiveStyle) => IItem;

export const createItem: ICreateItem = (
    { React, ReactHelmet, ReactRouterDom, ReactFela },
    useResponsiveStyle
) => {
    const Item: IItem = (props: IItemProps) => {
        const responsiveStyle = useResponsiveStyle();

        return (
            <div
                {...responsiveStyle([
                    {
                        /**
                         * the mobile values
                         */
                        padding: '8px 12px',
                        width: 'calc(100% - 24px)',
                        cursor: 'pointer',
                        borderRadius: '5px',

                        ':hover': {
                            background: '#efefef'
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
                {...filterNonItemProps(props)}
            >
                {props.value}
            </div>
        );
    };

    return Item;
};
