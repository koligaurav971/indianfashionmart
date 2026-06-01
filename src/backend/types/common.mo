import Time "mo:core/Time";

module {
  public type UserId = Principal;
  public type ListingId = Nat;
  public type MessageId = Nat;
  public type ConversationId = Nat;
  public type Timestamp = Int;

  public type Pagination = {
    offset : Nat;
    limit : Nat;
  };

  public type PageResult<T> = {
    items : [T];
    total : Nat;
    offset : Nat;
    limit : Nat;
  };
};
