type UserType = {
  clerk_id: string;
  email_address: string;
  username: string;
  image_url: string;
  first_name: string;
  last_name: string;
}

interface INewcomer {
  artistName: string;
  primaryGenre: string;
  yearsPerforming: string;
  musicalJourney: string;
  preferredInstrument: string;
}
type NewcomerType = {
  clerk_id: string;
  db_id: string;
  artistName: string;
  primaryGenre: string;
  yearsPerforming: string;
  musicalJourney: string;
  preferredInstrument: string;
}

type ClerkMetadata = {
  db_user_id?: string,
  is_verified_artist?: boolean,
}

type CollectionType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  gifts: GiftType[];
}

type GiftType = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  category: string;
  collections: [CollectionType];
  tags: [string];
  sizes: [string];
  colors: [string];
  price: number;
  expense: number;
  createdAt: Date;
  updatedAt: Date;
}

type OrderColumnType = {
  _id: string;
  customer: string;
  gifts: number;
  totalAmount: number;
  createdAt: string;
}

type OrderItemType = {
  gift: GiftType
  color: string;
  size: string;
  quantity: number;
}

type CustomerType = {
  clerk_id: string;
  name: string;
  email: string;
}