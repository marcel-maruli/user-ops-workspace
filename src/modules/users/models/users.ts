import { AxiosResponse } from "axios"

export type HttpResponseUser = AxiosResponse<GetUser[]>
export type HttpResponseUserDetail = AxiosResponse<GetUser>

export type GetUser = {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}

export type Address = {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

export type Geo = {
  lat: string
  lng: string
}

export type Company = {
  name: string
  catchPhrase: string
  bs: string
}

export type UserDetailPayload = {
    id: string
}
