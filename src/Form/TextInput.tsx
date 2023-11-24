import type { ILibrary } from '../Library';

/**
 * The properties of the Subdomain-Function
 * Extend the interface here!
 * All variables MUST have a value because the transpiler would remove them
 * see: https://stackoverflow.com/questions/52984808/is-there-a-way-to-get-all-required-properties-of-a-typescript-object
 */
export class CTextInputProps /* extends C_SINGLE_Props */ {
    children?:
        | React.ReactElement<any>
        | Array<React.ReactElement<any>>
        | string;

    id?: string;
    name?: string;
    label?: string;
    icon?: React.ReactElement<any>;
}

/**
 * This is the pure interface version, to be used/exported
 * When using mutliple parent classes, extend here - but then, we need to apply these in the other steps manually, too
 */
export interface ITextInputProps
    extends CTextInputProps /* , C_MULTIPLE1_Props,  C_MULTIPLE2_Props, */ {}

/**
 * The type of an array of the properties
 */
type ArrTextInputProps = Array<
    keyof CTextInputProps
> /* &  Array<keyof C_MULTIPLE1_Props> & C_MULTIPLE2_Props */;

/**
 * An array of the properties
 */
export const propsArray: ArrTextInputProps = Object.keys(
    new CTextInputProps()
) as ArrTextInputProps;

/* multiple parent classes
export const propsArray: ArrTextInputProps = [
    ...Object.keys(new CTextInputProps()),
    ...Object.keys(new C_MULTIPLE1_Props()),
    ...Object.keys(new C_MULTIPLE2_Props()),
 ] as ArrTextInputProps; */

/**
 * Get the properties from a bigger object
 */
export const filterTextInputProps = (
    props: any,
    { fallback = {} as any, override = {} } = {}
) => {
    const data = Object.assign(
        propsArray.reduce(
            (r: ITextInputProps, k: keyof CTextInputProps) => {
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
            new CTextInputProps()
        ),
        override
    ) as ITextInputProps;

    return data;
};

export const filterNonTextInputProps = (props: any) =>
    Object.keys(props).reduce((r: any, k: string) => {
        return {
            ...r,
            [k]: !propsArray.includes(k as keyof CTextInputProps)
                ? props[k]
                : undefined
        };
    }, {});

type ICreateTextInput = (props: ILibrary, useResponsiveStyle) => any;


/**
 * static properties of the TextInput
 */
type ITextInput<P> = React.FunctionComponent<P> & {
    //    Fieldset: string; // add this
};
// TextInput.Fieldset = "PanelFieldset";



export const createTextInput: ICreateTextInput = ({ React, Formik, PrimeReactElements }, useResponsiveStyle) => {

    function TextInput(props: ITextInputProps): JSX.Element {
        
        const [field, meta] = Formik.useField(props);
        return <div>
            <div className="p-inputgroup flex-1">
                
                { props.icon && <span className="p-inputgroup-addon">
                    {
                        props.icon
                    }
                </span>}
                
                <PrimeReactElements.InputText {...field}  {...filterNonTextInputProps(props)}/>
                
            </div>
            <div style={{color: "red", marginTop: "0px", height: "14px"}}><small>{ (meta.touched && meta.error) && meta.error }</small></div>
        </div>
    };

    return TextInput;
};
//<label htmlFor={props.id || props.name}>{props.label}</label>
