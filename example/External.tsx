/**
 * This module is the interface to the @calliopa/core-webapp library
 * use it like this:
 *   import External from '../External';
 *   const { Seo } = External;
 */

import * as React from 'react';
import * as ReactHelmet from 'react-helmet';
import * as ReactRouterDom from 'react-router-dom';
import * as Fela from "fela";
import * as ReactFela from "react-fela";
import * as FelaPresetWeb from 'fela-preset-web';
import FelaMediaQueryMobileFirst from 'fela-sort-media-query-mobile-first';
import deepmerge from 'deepmerge';


/** Import the default export factory from our library */
import createComponents, {
    //CEnvironmentProps, filterEnvironmentProps
} from '../src';



/** Call the factory, passing its dependencies (guaranteed to match what we're bundling) and get back our component */
export default {
    ...createComponents({
        React,
        ReactHelmet,
        ReactRouterDom,
        Fela,
        ReactFela,
        FelaPresetWeb,
        FelaMediaQueryMobileFirst,
        deepmerge
    })
};
