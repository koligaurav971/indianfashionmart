import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import Types "../types/users";
import UserLib "../lib/users";

mixin (
  accessControlState : AccessControl.AccessControlState,
  userProfiles : Map.Map<Common.UserId, Types.UserProfile>,
) {
  public shared ({ caller }) func createUserProfile(input : Types.UserProfileInput) : async Types.UserProfilePublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Authentication required");
    };
    UserLib.createProfile(userProfiles, caller, input);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?Types.UserProfilePublic {
    UserLib.getProfile(userProfiles, caller);
  };

  public query func getUserProfile(userId : Common.UserId) : async ?Types.UserProfilePublic {
    UserLib.getProfile(userProfiles, userId);
  };

  public shared ({ caller }) func updateUserProfile(input : Types.UserProfileInput) : async Types.UserProfilePublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Authentication required");
    };
    UserLib.updateProfile(userProfiles, caller, input);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : Types.UserProfileInput) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Authentication required");
    };
    ignore UserLib.createProfile(userProfiles, caller, profile);
  };
};
