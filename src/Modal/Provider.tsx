import type { ILibrary } from '../Library';

import { IUsedAsModalProps } from './UsedAsModal';

/**
 * The properties of the Provider-Function
 * Extend the interface here!
 */
export class CProviderProps /* extends C_SINGLE_Props */ {
    children?:
        | React.ReactElement<any>
        | Array<React.ReactElement<any>>
        | string;
}

/**
 * This is the pure interface version, to be used/exported
 * When using mutliple parent classes, extend here - but then, we need to apply these in the other steps manually, too
 */
export interface IProviderProps
    extends CProviderProps /* , C_MULTIPLE1_Props,  C_MULTIPLE2_Props, */ {}

/**
 * The type of an array of the properties
 */
type ArrProviderProps = Array<
    keyof CProviderProps
> /* &  Array<keyof C_MULTIPLE1_Props> & C_MULTIPLE2_Props */;

/**
 * An array of the properties
 */
export const propsArray: ArrProviderProps = Object.keys(
    new CProviderProps()
) as ArrProviderProps;

/* multiple parent classes
export const propsArray: ArrProviderProps = [
    ...Object.keys(new CProviderProps()),
    ...Object.keys(new C_MULTIPLE1_Props()),
    ...Object.keys(new C_MULTIPLE2_Props()),
 ] as ArrProviderProps; */

/**
 * Get the properties from a bigger object
 */
export const filterProviderProps = (props) =>
    propsArray.reduce((r, k) => {
        r[k] = props[k];
        return r;
    }, {}) as IProviderProps;

export const filterNonProviderProps = (props: any) =>
    Object.keys(props).reduce((r, k) => {
        if (!propsArray.includes(k as keyof CProviderProps)) {
            r[k] = props[k];
        }
        return r;
    }, {});

/**
 * What does the Provider -function return
 */
export interface IProviderResult {}

/**
 * the overall type of the `Provider`-function
 */
type IProvider = (props: IProviderProps) => JSX.Element;

type ICreateProvider = (
    props: ILibrary,
    useResponsiveStyle,
    Frame,
    Content
) => any;

export const createProvider: ICreateProvider = (
    { React },
    useResponsiveStyle,
    Frame,
    Content
) => {
    const ModalContext = React.createContext(null);

    const Provider: IProvider = (props: IProviderProps) => {
        const [openedModal, openModal] = React.useState(undefined);
        const closeModal = () => openModal(undefined);

        const showModal = (Modal: React.ReactElement<any>) => {
            openModal(Modal);
        };

        const value = { showModal };

        return (
            <ModalContext.Provider value={value}>
                {props.children}
                {openedModal && (
                    <Frame onClick={closeModal}>
                        <Content>
                            {
                                // we inject the IUsedAsModalProps here!
                                React.cloneElement(openedModal, {
                                    closeModal
                                } as IUsedAsModalProps)
                            }
                        </Content>
                    </Frame>
                )}
            </ModalContext.Provider>
        );
    };

    const useModal: any = () => {
        return React.useContext(ModalContext);
    };

    return {
        Provider,
        useModal
    };
};
