export type Filter = {
  property_name:
    | 'isin'
    | 'issuer_name'
    | 'filename'
    | 'industry'
    | 'risk_type'
    | 'green';
  values: string[];
};

export type Filters = {
  isin: string[];
  issuer_name: string[];
  filename: string[];
  industry: string[];
  risk_type: string[];
  green: string[];
};
