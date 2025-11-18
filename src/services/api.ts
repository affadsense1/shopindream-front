const API_BASE_URL = "https://api.shopindream.shop/public/api/product";

export interface SearchParams {
  q: string;
  page?: number;
  limit?: number;
  cat_id?: number;
  min_price?: number;
  max_price?: number;
  sort?: string;
  status?: number;
}

export interface Product {
  goods_id: number;
  goods_name: string;
  goods_no: string;
  price: number;
  special_price: number;
  actual_price: number;
  goods_image: string;
  cat_id: number;
  sales: number;
  score: number;
  tag: string;
  short_desc: string;
}

export interface SearchResponse {
  query: string;
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  processing_time_ms: number;
  items: Product[];
  filters: Record<string, any>;
}

export interface ProductDetail extends Product {
  goods_sales: number;
  seo_description: string;
  seo_keywords: string;
  seo_title: string;
  video_link: string;
  spec_type: number;
  goods_price: string;
  stock_total: number;
  content: string;
  status: number;
  review: Array<{
    name: string;
    content: string;
    star: number;
  }>;
  picture: string[];
  attr: Record<string, string>;
}

export class ProductAPI {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}/${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.status === 200 || result.code === 200) {
        return result.data || result;
      } else {
        throw new Error(result.message || 'API request failed');
      }
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async search(params: SearchParams): Promise<SearchResponse> {
    const data = await this.request('search.php', {
      method: 'POST',
      body: JSON.stringify(params),
    });
    return data;
  }

  async getDetail(goodsId: number): Promise<ProductDetail> {
    const data = await this.request(`detail.php?goods_id=${goodsId}`);
    return data.detail;
  }

  async getSuggestions(query: string, limit: number = 10): Promise<string[]> {
    const data = await this.request(
      `suggest.php?q=${encodeURIComponent(query)}&limit=${limit}`
    );
    return data.suggestions || [];
  }

  async getRandom(category?: string, num: number = 8): Promise<Product[]> {
    const params = new URLSearchParams({ num: num.toString() });
    if (category) {
      params.append('name', category);
    }
    const data = await this.request(`random.php?${params.toString()}`);
    const products = data.data || data;
    
    // Map API fields to match our Product interface
    return products.map((item: any) => ({
      goods_id: parseInt(item.id) || 0,
      goods_name: item.name || '',
      goods_no: item.goods_no || '',
      price: parseFloat(item.price) || 0,
      special_price: parseFloat(item.special_price) || 0,
      actual_price: parseFloat(item.special_price) || parseFloat(item.price) || 0,
      goods_image: item.thumbnail || item.goods_image || '',
      cat_id: parseInt(item.category?.split('/')[0]) || 0,
      sales: item.goods_sales || 0,
      score: parseFloat(item.score) || 0,
      tag: item.tag || '',
      short_desc: item.short_desc || ''
    }));
  }
}

export const productAPI = new ProductAPI();
