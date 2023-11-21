import { type ILibrary } from '../Library';
import { parseResponsiveStyle } from '../ResponsiveLayout';

/**
 * The properties of the Container-Function
 * Extend the interface here!
 */
export class CContainerProps /* extends C_SINGLE_Props */ {
    children?: React.ReactElement<any> | Array<React.ReactElement<any>>;
}

/**
 * This is the pure interface version, to be used/exported
 * When using mutliple parent classes, extend here - but then, we need to apply these in the other steps manually, too
 */
export interface IContainerProps
    extends CContainerProps /* , C_MULTIPLE1_Props,  C_MULTIPLE2_Props, */ {}

/**
 * The type of an array of the properties
 */
type ArrContainerProps = Array<
    keyof CContainerProps
> /* &  Array<keyof C_MULTIPLE1_Props> & C_MULTIPLE2_Props */;

/**
 * An array of the properties
 */
export const propsArray: ArrContainerProps = Object.keys(
    new CContainerProps()
) as ArrContainerProps;

/* multiple parent classes
export const propsArray: ArrContainerProps = [
    ...Object.keys(new CContainerProps()),
    ...Object.keys(new C_MULTIPLE1_Props()),
    ...Object.keys(new C_MULTIPLE2_Props()),
] as ArrContainerProps; */

/**
 * Get the properties from a bigger object
 */
export const filterContainerProps = (props) =>
    propsArray.reduce((r, k) => {
        r[k] = props[k];
        return r;
    }, {}) as IContainerProps;

/**
 * the overall type of the `Container`-function
 */
type IContainer = (props: IContainerProps) => JSX.Element;

type ICreateContainer = (props: ILibrary, useBreakpoints) => IContainer;

export const createContainer: ICreateContainer = (
    { React, ReactHelmet, ReactRouterDom, ReactFela },
    useBreakpoints
) => {
    const Container: IContainer = (props) => {
        const [ref, setRef] = React.useState(undefined);
        const [offset, setOffset] = React.useState(0);

        React.useEffect(() => {
            const onScroll = () => setOffset(window.scrollY);
            // clean up code
            window.removeEventListener('scroll', onScroll);
            window.addEventListener('scroll', onScroll, { passive: true });
            return () => window.removeEventListener('scroll', onScroll);
        }, []);

        const { css } = ReactFela.useFela();

        const breakpoints = useBreakpoints();
        return (
            <div
                className={css(
                    parseResponsiveStyle(
                        {
                            /**
                             * the mobile values
                             */

                            /**
                             * the tablet values
                             */
                            tablet: {},
                            /**
                             * the deskContainer values
                             */
                            desktop: {}
                            /* window.pageYOffset > divElement?.current?.offsetTop ? {
            position: "fixed",
            top: 0,
            width: "100%"
        } : {} ?? {} */
                        },
                        breakpoints
                    )
                )}
            >
                {React.Children.map(props.children, (child: any, index) => {
                    return React.cloneElement(child, {
                        // sticky: window.pageYOffset > ref?.current?.offsetTop && window.pageYOffset > ref?.current.clientHeight ? ref?.current.clientHeight : 0,
                        // replaced the above because it does not work SSR, the latter makes more sense anyway
                        sticky:
                            offset > ref?.current?.offsetTop &&
                            offset > ref?.current.clientHeight
                                ? ref?.current.clientHeight
                                : 0,
                        $setRef: setRef
                    });
                })}
            </div>
        );
    };

    return Container;
};
