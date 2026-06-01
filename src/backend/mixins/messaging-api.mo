import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import MsgTypes "../types/messaging";
import MsgLib "../lib/messaging";

mixin (
  accessControlState : AccessControl.AccessControlState,
  conversations : Map.Map<Common.ConversationId, MsgTypes.Conversation>,
  messages : Map.Map<Common.MessageId, MsgTypes.Message>,
  msgState : { var nextConversationId : Nat; var nextMessageId : Nat },
) {
  public shared ({ caller }) func sendMessage(input : MsgTypes.SendMessageInput) : async MsgTypes.MessagePublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Authentication required");
    };
    MsgLib.sendMessage(conversations, messages, msgState, caller, input);
  };

  public query ({ caller }) func getConversations(offset : Nat, limit : Nat) : async Common.PageResult<MsgTypes.ConversationPublic> {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      return { items = []; total = 0; offset; limit };
    };
    MsgLib.getConversations(conversations, caller, { offset; limit });
  };

  public query ({ caller }) func getMessages(conversationId : Common.ConversationId, offset : Nat, limit : Nat) : async Common.PageResult<MsgTypes.MessagePublic> {
    MsgLib.getMessages(messages, caller, conversationId, { offset; limit });
  };

  public shared ({ caller }) func markMessagesRead(conversationId : Common.ConversationId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Authentication required");
    };
    MsgLib.markMessagesRead(conversations, messages, caller, conversationId);
  };

  public query ({ caller }) func getUnreadCount() : async Nat {
    MsgLib.getUnreadCount(conversations, caller);
  };
};
