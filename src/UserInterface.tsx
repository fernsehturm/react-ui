import type { ILibrary } from './Library';

/**
 * The properties of the Subdomain-Function
 * Extend the interface here!
 * All variables MUST have a value because the transpiler would remove them
 * see: https://stackoverflow.com/questions/52984808/is-there-a-way-to-get-all-required-properties-of-a-typescript-object
 */
export class CUserInterfaceProps /* extends C_SINGLE_Props */ {
    children?:
        | React.ReactElement<any>
        | Array<React.ReactElement<any>>
        | string;

    renderer?: any;
}

/**
 * This is the pure interface version, to be used/exported
 * When using mutliple parent classes, extend here - but then, we need to apply these in the other steps manually, too
 */
export interface IUserInterfaceProps
    extends CUserInterfaceProps /* , C_MULTIPLE1_Props,  C_MULTIPLE2_Props, */ {}

/**
 * The type of an array of the properties
 */
type ArrUserInterfaceProps = Array<
    keyof CUserInterfaceProps
> /* &  Array<keyof C_MULTIPLE1_Props> & C_MULTIPLE2_Props */;

/**
 * An array of the properties
 */
export const propsArray: ArrUserInterfaceProps = Object.keys(
    new CUserInterfaceProps()
) as ArrUserInterfaceProps;

/* multiple parent classes
export const propsArray: ArrUserInterfaceProps = [
    ...Object.keys(new CUserInterfaceProps()),
    ...Object.keys(new C_MULTIPLE1_Props()),
    ...Object.keys(new C_MULTIPLE2_Props()),
 ] as ArrUserInterfaceProps; */

/**
 * Get the properties from a bigger object
 */
export const filterUserInterfaceProps = (
    props: any,
    { fallback = {} as any, override = {} } = {}
) => {
    const data = Object.assign(
        propsArray.reduce(
            (r: IUserInterfaceProps, k: keyof CUserInterfaceProps) => {
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
            new CUserInterfaceProps()
        ),
        override
    ) as IUserInterfaceProps;

    return data;
};

export const filterNonUserInterfaceProps = (props: any) =>
    Object.keys(props).reduce((r: any, k: string) => {
        return {
            ...r,
            [k]: !propsArray.includes(k as keyof CUserInterfaceProps)
                ? props[k]
                : undefined
        };
    }, {});

type ICreateUserInterface = (props: ILibrary) => any;

export const createUserInterface: ICreateUserInterface = ({
    React,
    ReactFela,
    Fela,
    FelaPresetWeb,
    FelaMediaQueryMobileFirst
}) => {
    const renderer = Fela.createRenderer({
        plugins: FelaPresetWeb.plugins,
        // make sure to render the mobile queries first so that the desktop overrides them - if specified
        enhancers: [FelaMediaQueryMobileFirst()]
    });

    function UserInterface(props: IUserInterfaceProps): JSX.Element {
        const value = {};

        return (
            <ReactFela.RendererProvider
                renderer={
                    props.renderer !== undefined ? props.renderer : renderer
                }
            >
                {props.children}
            </ReactFela.RendererProvider>
        );
    }

    return UserInterface;
};
