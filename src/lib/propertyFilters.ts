export type PropertiesFilterState = {
  purpose: '' | 'rent' | 'sale';
  category: '' | 'residential' | 'commercial';
  propertyType: string;
  bedrooms: '' | '0' | '1' | '2' | '3' | '4' | '5';
  priceMin: string;
  priceMax: string;
  community: string;
  search: string;
};

export const defaultPropertiesFilters: PropertiesFilterState = {
  purpose: '',
  category: '',
  propertyType: '',
  bedrooms: '',
  priceMin: '',
  priceMax: '',
  community: '',
  search: '',
};

export function hasActiveFilters(filters: PropertiesFilterState): boolean {
  return (
    filters.purpose !== '' ||
    filters.category !== '' ||
    filters.propertyType !== '' ||
    filters.bedrooms !== '' ||
    filters.priceMin !== '' ||
    filters.priceMax !== '' ||
    filters.community !== '' ||
    filters.search.trim() !== ''
  );
}

export function filtersToParams(
  filters: PropertiesFilterState,
  page: number,
  limit: number
): Record<string, string | number> {
  const params: Record<string, string | number> = { page, limit };

  if (filters.purpose) params.purpose = filters.purpose;
  if (filters.category) params.category = filters.category;
  if (filters.propertyType) params.propertyType = filters.propertyType;
  if (filters.bedrooms !== '') params.bedrooms = filters.bedrooms;
  if (filters.priceMin) params.priceMin = filters.priceMin;
  if (filters.priceMax) params.priceMax = filters.priceMax;
  if (filters.community) params.community = filters.community;
  if (filters.search.trim()) params.search = filters.search.trim();

  return params;
}
