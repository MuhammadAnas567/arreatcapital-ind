import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ScrollToHashOnLoad } from './components/ScrollToHashOnLoad';
import { HomePage } from './pages/HomePage';
import { ListingsPage } from './pages/ListingsPage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { CategoryListingPage } from './pages/CategoryListingPage';
import {
  AboutPage,
  ContactPage,
  FaqPage,
  InvestPage,
  ServicesPage,
  TeamPage,
} from './pages/ContentPages';
import { categoryPages } from './lib/siteNav';

export function App() {
  return (
    <BrowserRouter>
      <ScrollToHashOnLoad />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/property/:slug" element={<PropertyDetailPage />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/invest" element={<InvestPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {categoryPages.map((page) => (
          <Route
            key={page.path}
            path={page.path}
            element={<CategoryListingPage />}
          />
        ))}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
