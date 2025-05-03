export interface ComponentSpec {
  size: string;
  material: string;
  weight?: string;
  strength?: string;
  temperature?: string;
}

export interface ComponentProps {
  id: string;
  name: string;
  category: string;
  description: string;
  image?: string;
  specifications: ComponentSpec[];
  commonUses: string[];
  installationMethod: string;
  designConsiderations: string[];
  purchaseLinks?: {
    vendor: string;
    url: string;
    price?: string;
  }[];
  relatedComponents?: string[];
  tips?: string[];
}
