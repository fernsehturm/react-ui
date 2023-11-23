import type { ILibrary } from '../Library';

/**
 * The properties of the Subdomain-Function
 * Extend the interface here!
 * All variables MUST have a value because the transpiler would remove them
 * see: https://stackoverflow.com/questions/52984808/is-there-a-way-to-get-all-required-properties-of-a-typescript-object
 */
export class CAsyncButtonProps /* extends C_SINGLE_Props */ {
    isLoading: boolean = false;
}

/**
 * This is the pure interface version, to be used/exported
 * When using mutliple parent classes, extend here - but then, we need to apply these in the other steps manually, too
 */
export interface IAsyncButtonProps
    extends CAsyncButtonProps /* , C_MULTIPLE1_Props,  C_MULTIPLE2_Props, */ {}

/**
 * The type of an array of the properties
 */
type ArrAsyncButtonProps = Array<
    keyof CAsyncButtonProps
> /* &  Array<keyof C_MULTIPLE1_Props> & C_MULTIPLE2_Props */;

/**
 * An array of the properties
 */
export const propsArray: ArrAsyncButtonProps = Object.keys(
    new CAsyncButtonProps()
) as ArrAsyncButtonProps;

/* multiple parent classes
export const propsArray: ArrAsyncButtonProps = [
    ...Object.keys(new CAsyncButtonProps()),
    ...Object.keys(new C_MULTIPLE1_Props()),
    ...Object.keys(new C_MULTIPLE2_Props()),
 ] as ArrAsyncButtonProps; */

/**
 * Get the properties from a bigger object
 */
export const filterAsyncButtonProps = (
    props: any,
    { fallback = {} as any, override = {} } = {}
) => {
    const data = Object.assign(
        propsArray.reduce(
            (r: IAsyncButtonProps, k: keyof CAsyncButtonProps) => {
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
            new CAsyncButtonProps()
        ),
        override
    ) as IAsyncButtonProps;

    return data;
};

export const filterNonAsyncButtonProps = (props: any) =>
    Object.keys(props).reduce((r: any, k: string) => {
        return Object.assign(r, 
            !propsArray.includes(k as keyof CAsyncButtonProps) ? { [k]: props[k] } : {}
        )
    }, {});

type ICreateAsyncButton = (props: ILibrary) => any;


/**
 * static properties of the AsyncButton
 */
type IAsyncButton<P> = React.FunctionComponent<P> & {
    //    Fieldset: string; // add this
};
// AsyncButton.Fieldset = "PanelFieldset";



export const createAsyncButton: ICreateAsyncButton = ({ React, PrimeReactElements }) => {
    
    function AsyncButton(props: IAsyncButtonProps): JSX.Element {
        
        return (
                <PrimeReactElements.Button
                    loading={props.isLoading}
                    {...filterNonAsyncButtonProps(props)}
                />
            
        );
    }

    return AsyncButton;
};
