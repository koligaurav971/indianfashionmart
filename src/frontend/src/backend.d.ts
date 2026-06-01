import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface PageResult_2 {
    total: bigint;
    offset: bigint;
    limit: bigint;
    items: Array<ConversationPublic>;
}
export interface MessagePublic {
    id: MessageId;
    content: string;
    isRead: boolean;
    sentAt: Timestamp;
    conversationId: ConversationId;
    senderId: UserId;
}
export type Timestamp = bigint;
export interface PageResult_1 {
    total: bigint;
    offset: bigint;
    limit: bigint;
    items: Array<MessagePublic>;
}
export type Error_ = {
    __kind__: "FrontendOriginsNotConfigured";
    FrontendOriginsNotConfigured: null;
} | {
    __kind__: "MixedSsoSources";
    MixedSsoSources: {
        otherKeys: Array<string>;
        ssoKeys: Array<string>;
    };
} | {
    __kind__: "Stale";
    Stale: {
        ageNs: bigint;
    };
} | {
    __kind__: "MalformedCandid";
    MalformedCandid: null;
} | {
    __kind__: "AmbiguousAttribute";
    AmbiguousAttribute: {
        field: string;
        sources: Array<string>;
    };
} | {
    __kind__: "NoAttributes";
    NoAttributes: null;
} | {
    __kind__: "UnknownNonce";
    UnknownNonce: null;
} | {
    __kind__: "UntrustedSsoSource";
    UntrustedSsoSource: {
        domain: string;
    };
} | {
    __kind__: "MissingField";
    MissingField: string;
} | {
    __kind__: "FrontendOriginMismatch";
    FrontendOriginMismatch: {
        got: string;
        expected: Array<string>;
    };
};
export interface ConversationPublic {
    id: ConversationId;
    lastMessageAt: Timestamp;
    unreadCountSeller: bigint;
    listingId: ListingId;
    buyerId: UserId;
    sellerId: UserId;
    unreadCountBuyer: bigint;
}
export interface UserProfilePublic {
    id: UserId;
    bio?: string;
    name: string;
    memberSince: Timestamp;
    avatarUrl?: string;
    phone?: string;
    location?: string;
}
export type UserId = Principal;
export interface ListingInput {
    title: string;
    description: string;
    category: ListingCategory;
    price: bigint;
    location: string;
    condition: ListingCondition;
    images: Array<ExternalBlob>;
}
export type Result = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: Error_;
};
export interface ListingPublic {
    id: ListingId;
    status: ListingStatus;
    title: string;
    createdAt: Timestamp;
    description: string;
    updatedAt: Timestamp;
    viewCount: bigint;
    category: ListingCategory;
    sellerId: UserId;
    price: bigint;
    location: string;
    condition: ListingCondition;
    images: Array<ExternalBlob>;
}
export type MessageId = bigint;
export type ListingId = bigint;
export interface ListingFilter {
    maxPrice?: bigint;
    category?: ListingCategory;
    keyword?: string;
    minPrice?: bigint;
    location?: string;
    condition?: ListingCondition;
}
export type ConversationId = bigint;
export interface SendMessageInput {
    content: string;
    listingId: ListingId;
    conversationId?: ConversationId;
    recipientId: UserId;
}
export interface PageResult {
    total: bigint;
    offset: bigint;
    limit: bigint;
    items: Array<ListingPublic>;
}
export interface UserProfileInput {
    bio?: string;
    name: string;
    avatarUrl?: string;
    phone?: string;
    location?: string;
}
export enum ListingCategory {
    sarees = "sarees",
    accessories = "accessories",
    other = "other",
    footwear = "footwear",
    jewelry = "jewelry",
    kurtis = "kurtis",
    lehengas = "lehengas",
    salwarSuits = "salwarSuits"
}
export enum ListingCondition {
    fair = "fair",
    good = "good",
    poor = "poor",
    likeNew = "likeNew",
    brandNew = "brandNew"
}
export enum ListingStatus {
    active = "active",
    expired = "expired",
    sold = "sold"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createListing(input: ListingInput): Promise<ListingPublic>;
    createUserProfile(input: UserProfileInput): Promise<UserProfilePublic>;
    deleteListing(id: ListingId): Promise<void>;
    getCallerUserProfile(): Promise<UserProfilePublic | null>;
    getCallerUserRole(): Promise<UserRole>;
    getConversations(offset: bigint, limit: bigint): Promise<PageResult_2>;
    getFeaturedListings(offset: bigint, limit: bigint): Promise<PageResult>;
    getListing(id: ListingId): Promise<ListingPublic | null>;
    getListingsBySeller(sellerId: UserId, offset: bigint, limit: bigint): Promise<PageResult>;
    getMessages(conversationId: ConversationId, offset: bigint, limit: bigint): Promise<PageResult_1>;
    getSimilarListings(category: ListingCategory, location: string, excludeId: ListingId, offset: bigint, limit: bigint): Promise<PageResult>;
    getUnreadCount(): Promise<bigint>;
    getUserProfile(userId: UserId): Promise<UserProfilePublic | null>;
    incrementListingViewCount(id: ListingId): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    markMessagesRead(conversationId: ConversationId): Promise<void>;
    saveCallerUserProfile(profile: UserProfileInput): Promise<void>;
    searchListings(filter: ListingFilter, offset: bigint, limit: bigint): Promise<PageResult>;
    sendMessage(input: SendMessageInput): Promise<MessagePublic>;
    updateListing(id: ListingId, input: ListingInput): Promise<ListingPublic>;
    updateUserProfile(input: UserProfileInput): Promise<UserProfilePublic>;
}
