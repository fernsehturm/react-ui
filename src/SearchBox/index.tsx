import React from 'react';
import type { ILibrary } from '../Library';

import { createItem, IItemProps } from './Item';

/**
 * The properties of the SearchBox-Function
 * Extend the interface here!
 */
export class CSearchBoxProps /* extends C_SINGLE_Props */ {
    children?:
        | React.ReactElement<any>
        | Array<React.ReactElement<any>>
        | string;

    placeholder: string = '';

    onItemSelect: (value: string) => boolean = () => true;

    icon: React.FC;
}

/**
 * This is the pure interface version, to be used/exported
 * When using mutliple parent classes, extend here - but then, we need to apply these in the other steps manually, too
 */
export interface ISearchBoxProps
    extends CSearchBoxProps /* , C_MULTIPLE1_Props,  C_MULTIPLE2_Props, */ {}

/**
 * The type of an array of the properties
 */
type ArrSearchBoxProps = Array<
    keyof CSearchBoxProps
> /* &  Array<keyof C_MULTIPLE1_Props> & C_MULTIPLE2_Props */;

/**
 * An array of the properties
 */
export const propsArray: ArrSearchBoxProps = Object.keys(
    new CSearchBoxProps()
) as ArrSearchBoxProps;

/* multiple parent classes
export const propsArray: ArrSearchBoxProps = [
    ...Object.keys(new CSearchBoxProps()),
    ...Object.keys(new C_MULTIPLE1_Props()),
    ...Object.keys(new C_MULTIPLE2_Props()),
 ] as ArrSearchBoxProps; */

/**
 * Get the properties from a bigger object
 */
export const filterSearchBoxProps = (props) =>
    propsArray.reduce((r, k) => {
        r[k] = props[k];
        return r;
    }, {}) as ISearchBoxProps;

export const filterNonSearchBoxProps = (props: any) =>
    Object.keys(props).reduce((r, k) => {
        if (!propsArray.includes(k as keyof CSearchBoxProps)) {
            r[k] = props[k];
        }
        return r;
    }, {});

/**
 * What does the SearchBox -function return
 */
export interface ISearchBoxResult {}

/**
 * the overall type of the `SearchBox`-function
 */
// type ISearchBox = (props: ISearchBoxProps) => JSX.Element;

type ICreateSearchBox = (props: ILibrary, useResponsiveStyle) => ISearchBox;

/**
 * static properties of the _TEMPLATE_
 */
type ISearchBox = React.FunctionComponent<ISearchBoxProps> & {
    Item: React.FC<IItemProps>; // add this
    Icon: React.FC;
};

export const createSearchBox: ICreateSearchBox = (
    props,
    useResponsiveStyle
) => {
    const { React } = props;
    const Item = createItem(props, useResponsiveStyle);

    const SearchInput = (props) => {
        const responsiveStyle = useResponsiveStyle();

        return (
            <input
                type="text"
                placeholder={props.placeholder}
                {...responsiveStyle([
                    {
                        /**
                         * the mobile values
                         */
                        height: '55px',
                        width: 'calc(100% - 80px)',
                        outline: 'none',
                        border: 'none',
                        padding: '0 60px 0 20px',
                        boxShadow: '0px 1px 5px rgba(0,0,0,0.1)',
                        borderRadius: props.active ? '5px 5px 0 0' : '5px',
                        textSize: '18px',

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
                {...filterNonSearchBoxProps(props)}
            ></input>
        );
    };

    const AutoComplete = (props) => {
        const responsiveStyle = useResponsiveStyle();

        return (
            <ul
                {...responsiveStyle([
                    {
                        /**
                         * the mobile values
                         */
                        maxHeight: '280px',
                        overflowY: 'auto',
                        listStyleType: 'none',

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
                    props.active
                        ? {
                              padding: '10px 8px',
                              opacity: 1,
                              pointerEvents: 'auto'
                          }
                        : {
                              padding: 0,
                              opacity: 0,
                              pointerEvents: 'none'
                          }
                    // unfoldResponsiveUiData(GridUi.minWidthPixel, value => ({ minWidth: `${value}`}))
                ])}
                {...filterNonSearchBoxProps(props)}
            >
                {props.children}
            </ul>
        );
    };

    const Icon = (props) => {
        const responsiveStyle = useResponsiveStyle();

        return (
            <div
                {...responsiveStyle([
                    {
                        /**
                         * the mobile values
                         */
                        position: 'absolute',
                        right: '0px',
                        top: '0px',
                        height: '55px',
                        width: '55px',
                        textAlign: 'center',
                        lineHeight: '55px',
                        fontSize: '20px',
                        color: 'black',
                        cursor: 'pointer',

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
                {...filterNonSearchBoxProps(props)}
            >
                {props.children}
            </div>
        );
    };

    const SearchBox: ISearchBox = (props: ISearchBoxProps) => {
        const responsiveStyle = useResponsiveStyle();

        const [text, setText] = React.useState('');

        return (
            <div
                {...responsiveStyle([
                    {
                        /**
                         * the mobile values
                         */
                        width: '100%',
                        boxShadow: '0px 1px 5px rgba(0,0,0,0.1)',
                        background: '#FFF',
                        borderRadius: '5px',

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
                {...filterNonSearchBoxProps(props)}
            >
                <SearchInput
                    active={true}
                    placeholder={props.placeholder}
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    onKeyUp={(event) => {
                        if (event.keyCode === 13) {
                            props.onItemSelect(text);
                        }
                    }}
                />
                <AutoComplete active={true}>
                    {React.Children.map(props.children, (child) =>
                        React.cloneElement(child, {
                            onClick: () => {
                                setText(child.props.value);
                                props.onItemSelect(child.props.value);
                            }
                        })
                    )}
                </AutoComplete>
                {props.icon}
                {/* <Icon><FontAwesomeIcon icon={faMagnifyingGlass} onClick={() => props.onItemSelect(text)} /></Icon> */}
            </div>
        );
    };

    SearchBox.Item = Item;
    SearchBox.Icon = Icon;

    return SearchBox;
};
