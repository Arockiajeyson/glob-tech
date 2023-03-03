import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import Card from './Card'
import { Toast } from './Toast'
export default function Router() {
    return (
        <div>
            <BrowserRouter>
                <Toast>
                    <Routes>
                        <Route path='/' element={<App />} />
                        <Route path='/card' element={<Card />} />
                    </Routes>
                </Toast>
            </BrowserRouter>
        </div>
    )
}
