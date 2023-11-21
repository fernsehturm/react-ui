/**
 * A component that is used as a modal should extend this class because it
 * receives the specified properties
 */
export class CUsedAsModalProps /* extends C_SINGLE_Props */ {
    closeModal?: () => void;
}

/**
 * This is the pure interface version, to be used/exported
 * When using mutliple parent classes, extend here - but then, we need to apply these in the other steps manually, too
 */
export interface IUsedAsModalProps
    extends CUsedAsModalProps /* , C_MULTIPLE1_Props,  C_MULTIPLE2_Props, */ {}

/**
 * The type of an array of the properties
 */
type ArrUsedAsModalProps = Array<
    keyof CUsedAsModalProps
> /* &  Array<keyof C_MULTIPLE1_Props> & C_MULTIPLE2_Props */;

/**
 * An array of the properties
 */
export const propsArray: ArrUsedAsModalProps = Object.keys(
    new CUsedAsModalProps()
) as ArrUsedAsModalProps;

/**
 * Get the properties from a bigger object
 */
export const filterUsedAsModalProps = (props) =>
    propsArray.reduce((r, k) => {
        r[k] = props[k];
        return r;
    }, {}) as IUsedAsModalProps;

export const filterNonUsedAsModalProps = (props: any) =>
    Object.keys(props).reduce((r, k) => {
        if (!propsArray.includes(k as keyof CUsedAsModalProps)) {
            r[k] = props[k];
        }
        return r;
    }, {});
