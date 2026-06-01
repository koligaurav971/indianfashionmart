import Map "mo:core/Map";
import List "mo:core/List";
import Common "../types/common";
import Types "../types/messaging";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";

module {
  public func sendMessage(
    conversations : Map.Map<Common.ConversationId, Types.Conversation>,
    messages : Map.Map<Common.MessageId, Types.Message>,
    state : { var nextConversationId : Nat; var nextMessageId : Nat },
    caller : Common.UserId,
    input : Types.SendMessageInput,
  ) : Types.MessagePublic {
    let now = Time.now();
    // Find or create conversation
    let convId : Common.ConversationId = switch (input.conversationId) {
      case (?cid) { cid };
      case null {
        // Check if conversation already exists for this listing/buyer pair
        var existingId : ?Common.ConversationId = null;
        for ((_, conv) in conversations.entries()) {
          if (conv.listingId == input.listingId and conv.buyerId == caller) {
            existingId := ?conv.id;
          };
        };
        switch (existingId) {
          case (?eid) { eid };
          case null {
            let newConvId = state.nextConversationId;
            state.nextConversationId += 1;
            let conv : Types.Conversation = {
              id = newConvId;
              listingId = input.listingId;
              buyerId = caller;
              sellerId = input.recipientId;
              var lastMessageAt = now;
              var unreadCountBuyer = 0;
              var unreadCountSeller = 1;
            };
            conversations.add(newConvId, conv);
            newConvId;
          };
        };
      };
    };
    let conv = switch (conversations.get(convId)) {
      case null { Runtime.trap("Conversation not found") };
      case (?c) { c };
    };
    let msgId = state.nextMessageId;
    state.nextMessageId += 1;
    let msg : Types.Message = {
      id = msgId;
      conversationId = convId;
      senderId = caller;
      var content = input.content;
      var isRead = false;
      sentAt = now;
    };
    messages.add(msgId, msg);
    conv.lastMessageAt := now;
    // Increment unread count for the recipient
    if (caller == conv.buyerId) {
      conv.unreadCountSeller += 1;
    } else {
      conv.unreadCountBuyer += 1;
    };
    toPublicMessage(msg);
  };

  public func getConversations(
    conversations : Map.Map<Common.ConversationId, Types.Conversation>,
    caller : Common.UserId,
    pagination : Common.Pagination,
  ) : Common.PageResult<Types.ConversationPublic> {
    let all = List.empty<Types.ConversationPublic>();
    for ((_, conv) in conversations.entries()) {
      if (conv.buyerId == caller or conv.sellerId == caller) {
        all.add(toPublicConversation(conv));
      };
    };
    let total = all.size();
    let items = List.empty<Types.ConversationPublic>();
    var i = pagination.offset;
    while (i < total and items.size() < pagination.limit) {
      switch (all.get(i)) {
        case (?item) { items.add(item) };
        case null {};
      };
      i += 1;
    };
    { items = items.toArray(); total; offset = pagination.offset; limit = pagination.limit };
  };

  public func getMessages(
    messages : Map.Map<Common.MessageId, Types.Message>,
    caller : Common.UserId,
    conversationId : Common.ConversationId,
    pagination : Common.Pagination,
  ) : Common.PageResult<Types.MessagePublic> {
    ignore caller;
    let all = List.empty<Types.MessagePublic>();
    for ((_, msg) in messages.entries()) {
      if (msg.conversationId == conversationId) {
        all.add(toPublicMessage(msg));
      };
    };
    let total = all.size();
    let items = List.empty<Types.MessagePublic>();
    var i = pagination.offset;
    while (i < total and items.size() < pagination.limit) {
      switch (all.get(i)) {
        case (?item) { items.add(item) };
        case null {};
      };
      i += 1;
    };
    { items = items.toArray(); total; offset = pagination.offset; limit = pagination.limit };
  };

  public func markMessagesRead(
    conversations : Map.Map<Common.ConversationId, Types.Conversation>,
    messages : Map.Map<Common.MessageId, Types.Message>,
    caller : Common.UserId,
    conversationId : Common.ConversationId,
  ) : () {
    // Mark individual messages as read
    for ((_, msg) in messages.entries()) {
      if (msg.conversationId == conversationId and msg.senderId != caller) {
        msg.isRead := true;
      };
    };
    // Reset unread count for caller in the conversation
    switch (conversations.get(conversationId)) {
      case null {};
      case (?conv) {
        if (caller == conv.buyerId) {
          conv.unreadCountBuyer := 0;
        } else if (caller == conv.sellerId) {
          conv.unreadCountSeller := 0;
        };
      };
    };
  };

  public func getUnreadCount(
    conversations : Map.Map<Common.ConversationId, Types.Conversation>,
    caller : Common.UserId,
  ) : Nat {
    var total = 0;
    for ((_, conv) in conversations.entries()) {
      if (conv.buyerId == caller) {
        total += conv.unreadCountBuyer;
      } else if (conv.sellerId == caller) {
        total += conv.unreadCountSeller;
      };
    };
    total;
  };

  public func toPublicMessage(msg : Types.Message) : Types.MessagePublic {
    {
      id = msg.id;
      conversationId = msg.conversationId;
      senderId = msg.senderId;
      content = msg.content;
      isRead = msg.isRead;
      sentAt = msg.sentAt;
    };
  };

  public func toPublicConversation(conv : Types.Conversation) : Types.ConversationPublic {
    {
      id = conv.id;
      listingId = conv.listingId;
      buyerId = conv.buyerId;
      sellerId = conv.sellerId;
      lastMessageAt = conv.lastMessageAt;
      unreadCountBuyer = conv.unreadCountBuyer;
      unreadCountSeller = conv.unreadCountSeller;
    };
  };
};
