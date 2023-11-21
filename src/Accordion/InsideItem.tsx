/**
 * A component that is used inside an Item should extend this class because it
 * receives the specified properties
 */
export class CInsideItemProps /* extends C_SINGLE_Props */ {
    itemId?: string;
}

/**
 * This is the pure interface version, to be used/exported
 * When using mutliple parent classes, extend here - but then, we need to apply these in the other steps manually, too
 */
export interface IInsideItemProps
    extends CInsideItemProps /* , C_MULTIPLE1_Props,  C_MULTIPLE2_Props, */ {}

/**
 * The type of an array of the properties
 */
type ArrInsideItemProps = Array<
    keyof CInsideItemProps
> /* &  Array<keyof C_MULTIPLE1_Props> & C_MULTIPLE2_Props */;

/**
 * An array of the properties
 */
export const propsArray: ArrInsideItemProps = Object.keys(
    new CInsideItemProps()
) as ArrInsideItemProps;

/**
 * Get the properties from a bigger object
 */
export const filterInsideItemProps = (props) =>
    propsArray.reduce((r, k) => {
        r[k] = props[k];
        return r;
    }, {}) as IInsideItemProps;

export const filterNonInsideItemProps = (props: any) =>
    Object.keys(props).reduce((r, k) => {
        if (!propsArray.includes(k as keyof CInsideItemProps)) {
            r[k] = props[k];
        }
        return r;
    }, {});
