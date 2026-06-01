import type {
  ConversationId,
  ConversationPublic,
  ListingFilter,
  ListingId,
  ListingInput,
  ListingPublic,
  MessageId,
  MessagePublic,
  PageResult,
  SendMessageInput,
  Timestamp,
  UserId,
  UserProfileInput,
  UserProfilePublic,
} from "@/backend";
import type { Principal } from "@icp-sdk/core/principal";

export {
  ListingCategory,
  ListingCondition,
  ListingStatus,
  UserRole,
} from "@/backend";

export type {
  ListingPublic,
  UserProfilePublic,
  MessagePublic,
  ConversationPublic,
  ListingInput,
  UserProfileInput,
  SendMessageInput,
  ListingFilter,
  ListingId,
  UserId,
  ConversationId,
  MessageId,
  Timestamp,
};

export interface Pagination {
  offset: bigint;
  limit: bigint;
}

export interface PageResultOf<T> {
  total: bigint;
  offset: bigint;
  limit: bigint;
  items: T[];
}

// Re-export backend PageResult types with aliases
export type ListingPageResult = PageResultOf<ListingPublic>;
export type ConversationPageResult = PageResultOf<ConversationPublic>;
export type MessagePageResult = PageResultOf<MessagePublic>;

export type { Principal };

export interface CategoryItem {
  id: string;
  label: string;
  value: string;
  icon: string;
  color: string;
}

export interface SearchFilters {
  keyword?: string;
  category?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
}
