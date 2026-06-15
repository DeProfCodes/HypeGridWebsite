import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';

import ScrollToTop from '@/components/layout/ScrollToTop';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Campaigns from '@/pages/Campaigns';
import Creators from '@/pages/Creators';
import Packages from '@/pages/Packages';
import Deals from '@/pages/Deals';
import About from '@/pages/About';
import Contact from '@/pages/Contact';

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
