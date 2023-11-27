import type { ILibrary } from '../Library';

/**
 * The properties of the Subdomain-Function
 * Extend the interface here!
 * All variables MUST have a value because the transpiler would remove them
 * see: https://stackoverflow.com/questions/52984808/is-there-a-way-to-get-all-required-properties-of-a-typescript-object
 */
export class CRichTextProps /* extends C_SINGLE_Props */ {
    children?:
        | React.ReactElement<any>
        | Array<React.ReactElement<any>>
        | string;

    id?: string;
    name?: string;
    label?: string;
    placeholder?: string;
}

/**
 * This is the pure interface version, to be used/exported
 * When using mutliple parent classes, extend here - but then, we need to apply these in the other steps manually, too
 */
export interface IRichTextProps
    extends CRichTextProps /* , C_MULTIPLE1_Props,  C_MULTIPLE2_Props, */ {}

/**
 * The type of an array of the properties
 */
type ArrRichTextProps = Array<
    keyof CRichTextProps
> /* &  Array<keyof C_MULTIPLE1_Props> & C_MULTIPLE2_Props */;

/**
 * An array of the properties
 */
export const propsArray: ArrRichTextProps = Object.keys(
    new CRichTextProps()
) as ArrRichTextProps;

/* multiple parent classes
export const propsArray: ArrRichTextProps = [
    ...Object.keys(new CRichTextProps()),
    ...Object.keys(new C_MULTIPLE1_Props()),
    ...Object.keys(new C_MULTIPLE2_Props()),
 ] as ArrRichTextProps; */

/**
 * Get the properties from a bigger object
 */
export const filterRichTextProps = (
    props: any,
    { fallback = {} as any, override = {} } = {}
) => {
    const data = Object.assign(
        propsArray.reduce(
            (r: IRichTextProps, k: keyof CRichTextProps) => {
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
            new CRichTextProps()
        ),
        override
    ) as IRichTextProps;

    return data;
};

export const filterNonRichTextProps = (props: any) =>
    Object.keys(props).reduce((r: any, k: string) => {
        return {
            ...r,
            [k]: !propsArray.includes(k as keyof CRichTextProps)
                ? props[k]
                : undefined
        };
    }, {});

type ICreateRichText = (props: ILibrary, useResponsiveStyle) => any;


/**
 * static properties of the RichText
 */
type IRichText<P> = React.FunctionComponent<P> & {
    //    Fieldset: string; // add this
};
// RichText.Fieldset = "PanelFieldset";



export const createRichText: ICreateRichText = ({ React, ReactFela, Formik, Slate, SlateReact, SlateHistory }, useResponsiveStyle) => {

        
    const useEditor = () => {

        const editorRef = React.useRef();
        if (!editorRef.current) {
            editorRef.current = SlateHistory.withHistory(SlateReact.withReact(Slate.createEditor()))
        };
        return editorRef.current
    };
  

    function RichText(props: IRichTextProps): JSX.Element {

        const [field, meta, helpers] = Formik.useField(props);
        
        //console.log(field)
        const { staticStyle } = ReactFela.useFela();

        staticStyle({
            width: "100%",
            padding: "12px",
            borderRadius: "5px",
            outline: "none",
            border: "1px solid gray",
        }, ".editor");

        const editor = useEditor()

        const { setValue } = helpers;

        const initialValue = field?.value?.length > 0 ? field.value : [{
            type: "paragraph",
            children: [{ text: "" }],
            },
        ];
        
        return <div>
            <div className="card flex flex-wrap justify-content-left gap-3">
                { props.label }
            </div>
            <div className="p-inputgroup flex-1">
                
                <SlateReact.Slate initialValue={initialValue} editor={editor} onChange={(v) => setValue(v)}>
                    <SlateReact.Editable
                        placeholder={props.placeholder}
                        className="editor"  />
                </SlateReact.Slate>
            </div>
        </div>

    };

    return RichText;
};