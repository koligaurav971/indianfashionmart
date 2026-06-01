import Common "./common";

module {
  public type UserProfile = {
    id : Common.UserId;
    var name : Text;
    var phone : ?Text;
    var location : ?Text;
    var bio : ?Text;
    var avatarUrl : ?Text;
    memberSince : Common.Timestamp;
  };

  public type UserProfilePublic = {
    id : Common.UserId;
    name : Text;
    phone : ?Text;
    location : ?Text;
    bio : ?Text;
    avatarUrl : ?Text;
    memberSince : Common.Timestamp;
  };

  public type UserProfileInput = {
    name : Text;
    phone : ?Text;
    location : ?Text;
    bio : ?Text;
    avatarUrl : ?Text;
  };
};
