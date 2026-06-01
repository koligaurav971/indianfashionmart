import Map "mo:core/Map";
import Time "mo:core/Time";
import Common "../types/common";
import Types "../types/users";
import Runtime "mo:core/Runtime";

module {
  public func createProfile(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    caller : Common.UserId,
    input : Types.UserProfileInput,
  ) : Types.UserProfilePublic {
    switch (profiles.get(caller)) {
      case (?existing) { toPublic(existing) };
      case null {
        let profile : Types.UserProfile = {
          id = caller;
          var name = input.name;
          var phone = input.phone;
          var location = input.location;
          var bio = input.bio;
          var avatarUrl = input.avatarUrl;
          memberSince = Time.now();
        };
        profiles.add(caller, profile);
        toPublic(profile);
      };
    };
  };

  public func getProfile(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
  ) : ?Types.UserProfilePublic {
    switch (profiles.get(userId)) {
      case (?p) { ?toPublic(p) };
      case null { null };
    };
  };

  public func updateProfile(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    caller : Common.UserId,
    input : Types.UserProfileInput,
  ) : Types.UserProfilePublic {
    switch (profiles.get(caller)) {
      case null { Runtime.trap("Profile not found") };
      case (?profile) {
        profile.name := input.name;
        profile.phone := input.phone;
        profile.location := input.location;
        profile.bio := input.bio;
        profile.avatarUrl := input.avatarUrl;
        toPublic(profile);
      };
    };
  };

  public func toPublic(profile : Types.UserProfile) : Types.UserProfilePublic {
    {
      id = profile.id;
      name = profile.name;
      phone = profile.phone;
      location = profile.location;
      bio = profile.bio;
      avatarUrl = profile.avatarUrl;
      memberSince = profile.memberSince;
    };
  };
};
