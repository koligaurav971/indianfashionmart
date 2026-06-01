import Common "./common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type ListingCategory = {
    #sarees;
    #kurtis;
    #lehengas;
    #salwarSuits;
    #jewelry;
    #accessories;
    #footwear;
    #other;
  };

  public type ListingCondition = {
    #brandNew;
    #likeNew;
    #good;
    #fair;
    #poor;
  };

  public type ListingStatus = {
    #active;
    #expired;
    #sold;
  };

  public type Listing = {
    id : Common.ListingId;
    sellerId : Common.UserId;
    var title : Text;
    var description : Text;
    var category : ListingCategory;
    var condition : ListingCondition;
    var price : Nat;
    var location : Text;
    var images : [Storage.ExternalBlob];
    var status : ListingStatus;
    var viewCount : Nat;
    createdAt : Common.Timestamp;
    var updatedAt : Common.Timestamp;
  };

  public type ListingPublic = {
    id : Common.ListingId;
    sellerId : Common.UserId;
    title : Text;
    description : Text;
    category : ListingCategory;
    condition : ListingCondition;
    price : Nat;
    location : Text;
    images : [Storage.ExternalBlob];
    status : ListingStatus;
    viewCount : Nat;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type ListingInput = {
    title : Text;
    description : Text;
    category : ListingCategory;
    condition : ListingCondition;
    price : Nat;
    location : Text;
    images : [Storage.ExternalBlob];
  };

  public type ListingFilter = {
    keyword : ?Text;
    category : ?ListingCategory;
    minPrice : ?Nat;
    maxPrice : ?Nat;
    location : ?Text;
    condition : ?ListingCondition;
  };
};
