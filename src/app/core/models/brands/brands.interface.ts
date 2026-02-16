export interface brandsResponse {
  results: number
  metadata: Metadata
  data: brands[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
  nextPage: number
}

export interface brands {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}
