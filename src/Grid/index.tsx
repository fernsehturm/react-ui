import type { ILibrary } from '../Library';
import { createHead } from './Head';

/**
 * The properties of the Grid-Function
 * Extend the interface here!
 */
export class CGridProps /* extends C_SINGLE_Props */ {
    children?:
        | React.ReactElement<any>
        | Array<React.ReactElement<any>>
        | string;

    columns: number = 0;

    /** the first element in a row is a header */
    rowHeader: boolean = false;
}

/**
 * This is the pure interface version, to be used/exported
 * When using mutliple parent classes, extend here - but then, we need to apply these in the other steps manually, too
 */
export interface IGridProps
    extends CGridProps /* , C_MULTIPLE1_Props,  C_MULTIPLE2_Props, */ {}

/**
 * The type of an array of the properties
 */
type ArrGridProps = Array<
    keyof CGridProps
> /* &  Array<keyof C_MULTIPLE1_Props> & C_MULTIPLE2_Props */;

/**
 * An array of the properties
 */
export const propsArray: ArrGridProps = Object.keys(
    new CGridProps()
) as ArrGridProps;

/* multiple parent classes
export const propsArray: ArrGridProps = [
    ...Object.keys(new CGridProps()),
    ...Object.keys(new C_MULTIPLE1_Props()),
    ...Object.keys(new C_MULTIPLE2_Props()),
 ] as ArrGridProps; */

/**
 * Get the properties from a bigger object
 */
export const filterGridProps = (props) =>
    propsArray.reduce((r, k) => {
        r[k] = props[k];
        return r;
    }, {}) as IGridProps;

export const filterNonGridProps = (props: any) =>
    Object.keys(props).reduce((r, k) => {
        if (!propsArray.includes(k as keyof CGridProps)) {
            r[k] = props[k];
        }
        return r;
    }, {});

/**
 * What does the Grid -function return
 */
export interface IGridResult {}

/**
 * static properties of the _TEMPLATE_
 */
type IGrid<P> = React.FunctionComponent<P> & {
    Head: any;
};
// type IContent = (props: IContentProps) => JSX.Element;

export const createGrid = (props: ILibrary, useResponsiveStyle) => {
    const { React } = props;

    const Grid: IGrid<IGridProps> = (props: IGridProps) => {
        const responsiveStyle = useResponsiveStyle();

        return (
            <div
                {...responsiveStyle([
                    {
                        /**
                         * the mobile values
                         */
                        display: 'grid',
                        gridTemplateColumns: `${
                            props.rowHeader ? '30%' : ''
                        } repeat(${props.columns}, calc(${
                            props.rowHeader ? '70%' : '100%'
                        } / ${props.columns}))`,

                        border: '2px dashed black',
                        fontFamily: 'monospace, monospace',
                        fontSize: '1rem',

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
                {...filterNonGridProps(props)}
            >
                {props.children}
            </div>
        );
    };

    Grid.Head = createHead(props, useResponsiveStyle);

    return Grid;
};
