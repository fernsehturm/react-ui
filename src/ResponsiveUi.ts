/**
 * The properties of the _TEMPLATE_-Function
 * Extend the interface here!
 */
export class CResponsiveUiData<T> /* extends C_SINGLE_Props */ {
    mobile?: T;

    tablet?: T;

    desktop?: T;
}

/**
 * This is the pure interface version, to be used/exported
 * When using mutliple parent classes, extend here - but then, we need to apply these in the other steps manually, too
 */
export interface IResponsiveUiData<T>
    extends CResponsiveUiData<T> /* , C_MULTIPLE1_Props,  C_MULTIPLE2_Props, */ {}

/**
 * The type of an array of the properties
 */
type ArrResponsiveUiData<T> = Array<
    keyof CResponsiveUiData<T>
> /* &  Array<keyof C_MULTIPLE1_Props> & C_MULTIPLE2_Props */;

/**
 * An array of the properties
 */
export const propsArray: ArrResponsiveUiData<any> = Object.keys(
    new CResponsiveUiData()
) as ArrResponsiveUiData<any>;

/**
 * Get the properties from a bigger object
 */
export const filterResponsiveUiData = (props) =>
    propsArray.reduce((r, k) => {
        r[k] = props[k];
        return r;
    }, {}) as IResponsiveUiData<any>;

export const createResponsiveUi = ({ deepmerge }) => {
    function unfoldResponsiveUiData<T>(
        data: CResponsiveUiData<T>,
        cb: (value: T | undefined) => Object
    ): Object {
        return deepmerge.all(
            Object.keys(data).map((device) => {
                if (device != 'mobile') {
                    const result = {};
                    result[device] = cb(data[device]);
                    return result;
                }
                return cb(data[device]);
            })
        );
    }

    return unfoldResponsiveUiData;
};
