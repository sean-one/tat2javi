
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import App from './App.js';

const root = createRoot(document.getElementById('root'));

require('dotenv').config();

root.render(
    <BrowserRouter>
        <Routes>
            <Route path='/*' element={<App />} />
        </Routes>
    </BrowserRouter>);