export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export interface User {
  id: number
  name: string
  email: string
  website: string
  phone: number
  address: {
    street: string
    suite: string
    city: string
  }
  company: {
    name: string
  }
}

export interface Comment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}
