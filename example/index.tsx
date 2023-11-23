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

import { InputText } from 'primereact/inputtext';
import { Timeline } from 'primereact/timeline';

import "primereact/resources/themes/lara-light-cyan/theme.css";

export const WebApp = (props)  => {
    
    const [menuActive, toggleMenu] = React.useState<boolean>(false);

    const events = [
        { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
        { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
        { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
        { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
    ];
      

    return <UserInterface>
        <ResponsiveLayout tablet={900} desktop={1400}>
        <Modal.Provider>
        <FloatingButton horizontalPos="right" onClick={() =>  {/*showModal(<CommandModal/>*/console.log("klick")}}>+</FloatingButton>
            
        <Layout.Container>

            <Layout.Header sticky={false} >
                
            <OnlyMobile><MenuToggle toggleMenu={toggleMenu}></MenuToggle></OnlyMobile>

            <NotOnMobile>Link</NotOnMobile >
            
            
            
        </Layout.Header>
            <Layout.Content sticky={false}>         
                <Layout.ResponsiveMenu showMenu={menuActive}>
                    Menu
                </Layout.ResponsiveMenu>
                <Container>
                    {/*<Outlet/>*/}
                    <InputText value={"value"} onChange={(e) => console.log(e.target.value)} />
                    <div className="card">
            <Timeline value={events} opposite={(item) => item.status} content={(item) => <small className="text-color-secondary">{item.date}</small>} />
        </div>
                </Container>
            </Layout.Content>
        </Layout.Container>
        </Modal.Provider>
        </ResponsiveLayout>
    </UserInterface>

}

const root = createRoot(document.getElementById('root'));
root.render(<WebApp />);

