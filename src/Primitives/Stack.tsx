import type { ILibrary } from '../Library';

/**
 * The properties of the Subdomain-Function
 * Extend the interface here!
 * All variables MUST have a value because the transpiler would remove them
 * see: https://stackoverflow.com/questions/52984808/is-there-a-way-to-get-all-required-properties-of-a-typescript-object
 */
export class CStackProps /* extends C_SINGLE_Props */ {
    children?:
        | React.ReactElement<any>
        | Array<React.ReactElement<any>>
        | string;

}

/**
 * This is the pure interface version, to be used/exported
 * When using mutliple parent classes, extend here - but then, we need to apply these in the other steps manually, too
 */
export interface IStackProps
    extends CStackProps /* , C_MULTIPLE1_Props,  C_MULTIPLE2_Props, */ {}

/**
 * The type of an array of the properties
 */
type ArrStackProps = Array<
    keyof CStackProps
> /* &  Array<keyof C_MULTIPLE1_Props> & C_MULTIPLE2_Props */;

/**
 * An array of the properties
 */
export const propsArray: ArrStackProps = Object.keys(
    new CStackProps()
) as ArrStackProps;

/* multiple parent classes
export const propsArray: ArrStackProps = [
    ...Object.keys(new CStackProps()),
    ...Object.keys(new C_MULTIPLE1_Props()),
    ...Object.keys(new C_MULTIPLE2_Props()),
 ] as ArrStackProps; */

/**
 * Get the properties from a bigger object
 */
export const filterStackProps = (
    props: any,
    { fallback = {} as any, override = {} } = {}
) => {
    const data = Object.assign(
        propsArray.reduce(
            (r: IStackProps, k: keyof CStackProps) => {
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
            new CStackProps()
        ),
        override
    ) as IStackProps;

    return data;
};

export const filterNonStackProps = (props: any) =>
    Object.keys(props).reduce((r: any, k: string) => {
        return Object.assign(r, 
            !propsArray.includes(k as keyof CStackProps) ? { [k]: props[k] } : {}
        )

    }, {});

type ICreateStack = (props: ILibrary, useResponsiveStyle) => any;


/**
 * static properties of the Stack
 */
type IStack<P> = React.FunctionComponent<P> & {
    //    Fieldset: string; // add this
};
// Stack.Fieldset = "PanelFieldset";



export const createStack: ICreateStack = ({ React }, useResponsiveStyle) => {
    
    function Stack(props: IStackProps): JSX.Element {
        const responsiveStyle = useResponsiveStyle();

        return (
            <div {...responsiveStyle([
                {
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    maxWidth: "600px",
                    margin: "0 0 auto 0",
                    "> *": {
                        marginTop: "10px"
                    }
                }
            ])}>
                { props.children }
            </div>
        );
    }

    return Stack;
};
