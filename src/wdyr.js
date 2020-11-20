import React from 'react';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import * as hooks from './hooks';

whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackHooks: true,
    logOnDifferentValues: true,
    logOwnerReasons: true,
    // // eslint-disable-next-line no-undef
    // trackExtraHooks: [[require('./hooks/index'), 'useDarkMode']],
});
