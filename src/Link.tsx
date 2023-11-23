import type { ILibrary } from './Library';

/**
 * The properties of the Subdomain-Function
 * Extend the interface here!
 * All variables MUST have a value because the transpiler would remove them
 * see: https://stackoverflow.com/questions/52984808/is-there-a-way-to-get-all-required-properties-of-a-typescript-object
 */
export class CLinkProps /* extends C_SINGLE_Props */ {
    children?:
        | React.ReactElement<any>
        | Array<React.ReactElement<any>>
        | string;
    gap?: boolean | null = null;
    block?: boolean | null = null;
}

/**
 * This is the pure interface version, to be used/exported
 * When using mutliple parent classes, extend here - but then, we need to apply these in the other steps manually, too
 */
export interface ILinkProps
    extends CLinkProps /* , C_MULTIPLE1_Props,  C_MULTIPLE2_Props, */ {}

/**
 * The type of an array of the properties
 */
type ArrLinkProps = Array<
    keyof CLinkProps
> /* &  Array<keyof C_MULTIPLE1_Props> & C_MULTIPLE2_Props */;

/**
 * An array of the properties
 */
export const propsArray: ArrLinkProps = Object.keys(
    new CLinkProps()
) as ArrLinkProps;

/* multiple parent classes
export const propsArray: ArrLinkProps = [
    ...Object.keys(new CLinkProps()),
    ...Object.keys(new C_MULTIPLE1_Props()),
    ...Object.keys(new C_MULTIPLE2_Props()),
 ] as ArrLinkProps; */

/**
 * Get the properties from a bigger object
 */
export const filterLinkProps = (
    props: any,
    { fallback = {} as any, override = {} } = {}
) => {
    const data = Object.assign(
        propsArray.reduce(
            (r: ILinkProps, k: keyof CLinkProps) => {
                // do not overwrite the IEntry values with undefined
                return {
                    ...r,
                    [k]: (function () {
                        if (
                            props[k] !== undefined &&
                            props[k]?.localeCompare?.('') !== 0
                        ) {
                            return props[k];
                        }
                        if (fallback[k] !== undefined) {
                            return fallback[k];
                        }
                        return undefined;
                    })()
                };
            },
            new CLinkProps()
        ),
        override
    ) as ILinkProps;

    return data;
};


export const filterNonLinkProps = (props: any) =>
    Object.keys(props).reduce((r: any, k: string) => {
        return Object.assign(r, 
            !propsArray.includes(k as keyof CLinkProps) ? { [k]: props[k] } : {}
        )

    }, {});

type ICreateLink = (props: ILibrary, useResponsiveStyle) => any;


/**
 * static properties of the Link
 */
type ILink<P> = React.FunctionComponent<P> & {
    //    Fieldset: string; // add this
};
// Link.Fieldset = "PanelFieldset";



export const createLink: ICreateLink = ({ React, ReactRouterDom }, useResponsiveStyle) => {
    function Link(props: ILinkProps): JSX.Element {
        const responsiveStyle = useResponsiveStyle();
        
        return <ReactRouterDom.NavLink {...responsiveStyle([{
            /**
             * the mobile values
             */
            //borderBottom: "2px dotted black",
            textDecoration: "none",
            color: 'var(--primary-color)',

            
            /**
             * the tablet values
             */
            tablet: {
                
            },
            /**
             * the desktop values
             */
            desktop: {
                //width: `calc(${breakpoints.desktop}px - 4em)`,
                
            }
            
        },
        props.gap == true ? {
            marginLeft: "auto",
        }: {},
        props.block == true ? {
            // table shows the content with line breaks, but does not cover the full width
            display: "table"
        } : {}
        //unfoldResponsiveUiData(GridUi.minWidthPixel, value => ({ minWidth: `${value}`}))
        ])}  {...filterNonLinkProps(props)}>{ props.children }</ReactRouterDom.NavLink>
    }

    return Link;
};
