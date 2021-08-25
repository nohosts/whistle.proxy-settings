import React from 'react';
import ReactDom from 'react-dom';

import { Container } from './Container';
console.log(process.env.NODE_ENV);
ReactDom.render(<Container />, document.querySelector('#root'));
