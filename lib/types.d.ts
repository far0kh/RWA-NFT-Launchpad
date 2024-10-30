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
  clerkId: string;
  name: string;
  email: string;
}