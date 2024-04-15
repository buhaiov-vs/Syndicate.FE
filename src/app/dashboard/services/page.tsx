'use client';

import { ServicesContextProvider } from './context';
import ServicesPageContent from './pageContent';

export default function ServicesPage() {
    return (
      <ServicesContextProvider>
         <ServicesPageContent />
      </ServicesContextProvider>
    );
}