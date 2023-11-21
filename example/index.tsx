/**
 * The Entrypoint of the WebApp
 * tighlty coupled with the `index.html` because we load the
 * Environment variables from the `window`-object.
 */


import * as React from 'react';
import { createRoot } from 'react-dom/client';

import External from './External';
const {
    Container,
    FloatingButton,
    Layout,
    OnlyMobile,
    MenuToggle,
    NotOnMobile,
    ResponsiveLayout,
    UserInterface,
    Modal
} = External;

// increase the stack trace
Error.stackTraceLimit = 25;


export const WebApp = (props)  => {
    
    const [menuActive, toggleMenu] = React.useState<boolean>(false);

    return <UserInterface>
        <ResponsiveLayout tablet={900} desktop={1400}>
        <Modal.Provider>
        <Layout.Container>
            <FloatingButton horizontalPos="right" onClick={() =>  {/*showModal(<CommandModal/>*/console.log("klick")}}>+</FloatingButton>
            <Layout.Top>
            </Layout.Top>
            <Layout.Header sticky={0} >
                
            <OnlyMobile><MenuToggle toggleMenu={toggleMenu}></MenuToggle></OnlyMobile>

            <NotOnMobile>Link</NotOnMobile >
            
            
            
        </Layout.Header>
            <Layout.Content sticky={0}>         
                <Layout.ResponsiveMenu showMenu={menuActive}>
                    Menu
                </Layout.ResponsiveMenu>
                <Container>
                    {/*<Outlet/>*/}
                    Content
                </Container>
            </Layout.Content>
        </Layout.Container>
        </Modal.Provider>
        </ResponsiveLayout>
    </UserInterface>

}

const root = createRoot(document.getElementById('root'));
root.render(<WebApp />);

