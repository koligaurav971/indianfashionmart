import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import ListingTypes "../types/listings";
import ListingLib "../lib/listings";

mixin (
  accessControlState : AccessControl.AccessControlState,
  listings : Map.Map<Common.ListingId, ListingTypes.Listing>,
  listingState : { var nextListingId : Nat },
) {
  public shared ({ caller }) func createListing(input : ListingTypes.ListingInput) : async ListingTypes.ListingPublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Authentication required");
    };
    ListingLib.createListing(listings, listingState, caller, input);
  };

  public query func getListing(id : Common.ListingId) : async ?ListingTypes.ListingPublic {
    ListingLib.getListing(listings, id);
  };

  public shared ({ caller }) func updateListing(id : Common.ListingId, input : ListingTypes.ListingInput) : async ListingTypes.ListingPublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Authentication required");
    };
    ListingLib.updateListing(listings, caller, id, input);
  };

  public shared ({ caller }) func deleteListing(id : Common.ListingId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Authentication required");
    };
    ListingLib.deleteListing(listings, caller, id);
  };

  public query func searchListings(filter : ListingTypes.ListingFilter, offset : Nat, limit : Nat) : async Common.PageResult<ListingTypes.ListingPublic> {
    ListingLib.searchListings(listings, filter, { offset; limit });
  };

  public query func getFeaturedListings(offset : Nat, limit : Nat) : async Common.PageResult<ListingTypes.ListingPublic> {
    ListingLib.getFeaturedListings(listings, { offset; limit });
  };

  public query func getListingsBySeller(sellerId : Common.UserId, offset : Nat, limit : Nat) : async Common.PageResult<ListingTypes.ListingPublic> {
    ListingLib.getListingsBySeller(listings, sellerId, { offset; limit });
  };

  public query func getSimilarListings(category : ListingTypes.ListingCategory, location : Text, excludeId : Common.ListingId, offset : Nat, limit : Nat) : async Common.PageResult<ListingTypes.ListingPublic> {
    ListingLib.getSimilarListings(listings, category, location, excludeId, { offset; limit });
  };

  public shared ({ caller }) func incrementListingViewCount(id : Common.ListingId) : async () {
    ignore caller;
    ListingLib.incrementViewCount(listings, id);
  };
};
