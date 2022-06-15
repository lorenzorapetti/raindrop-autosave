export interface Collection {
  _id: number
  title: string
  slug: string
}

export interface Raindrop {
  _id: number
  link: string
}

export interface ListResponse<T> {
  result: boolean
  items: T[]
}

export interface SingleResponse<T> {
  result: boolean
  item: T
}
