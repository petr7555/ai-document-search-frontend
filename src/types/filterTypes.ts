export type Filters = {
  property_name: 'isin' | 'shortname';
  values: string[];
};

export type AvailableFilterOptions = {
  isin: string[];
  shortname: string[];
};
