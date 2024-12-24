import React, { ReactNode } from 'react';
import { Header } from './components/navbar'; 

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div>
            <Header />
            <main className="p-4">{children}</main>
        </div>
    );
}

