import Common "./common";

module {
  public type Message = {
    id : Common.MessageId;
    conversationId : Common.ConversationId;
    senderId : Common.UserId;
    var content : Text;
    var isRead : Bool;
    sentAt : Common.Timestamp;
  };

  public type MessagePublic = {
    id : Common.MessageId;
    conversationId : Common.ConversationId;
    senderId : Common.UserId;
    content : Text;
    isRead : Bool;
    sentAt : Common.Timestamp;
  };

  public type Conversation = {
    id : Common.ConversationId;
    listingId : Common.ListingId;
    buyerId : Common.UserId;
    sellerId : Common.UserId;
    var lastMessageAt : Common.Timestamp;
    var unreadCountBuyer : Nat;
    var unreadCountSeller : Nat;
  };

  public type ConversationPublic = {
    id : Common.ConversationId;
    listingId : Common.ListingId;
    buyerId : Common.UserId;
    sellerId : Common.UserId;
    lastMessageAt : Common.Timestamp;
    unreadCountBuyer : Nat;
    unreadCountSeller : Nat;
  };

  public type SendMessageInput = {
    conversationId : ?Common.ConversationId;
    listingId : Common.ListingId;
    recipientId : Common.UserId;
    content : Text;
  };
};
