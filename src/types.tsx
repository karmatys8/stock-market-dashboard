export interface News {
  category: string,
  datetime: number,
  headline: string,
  id: number,
  image: string,
  related: string,
  source: string,
  summary: string,
  url: string
}


export interface Stock {
  descripiton: string,
  displaySymbol: string,
  symbol: string,
  type: string
}

export interface StockSearchResult {
  count: number,
  result: Stock[]
}