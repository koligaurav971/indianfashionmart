import Map "mo:core/Map";
import List "mo:core/List";
import Common "../types/common";
import Types "../types/listings";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";

module {
  public func createListing(
    listings : Map.Map<Common.ListingId, Types.Listing>,
    state : { var nextListingId : Nat },
    caller : Common.UserId,
    input : Types.ListingInput,
  ) : Types.ListingPublic {
    let id = state.nextListingId;
    state.nextListingId += 1;
    let now = Time.now();
    let listing : Types.Listing = {
      id;
      sellerId = caller;
      var title = input.title;
      var description = input.description;
      var category = input.category;
      var condition = input.condition;
      var price = input.price;
      var location = input.location;
      var images = input.images;
      var status = #active;
      var viewCount = 0;
      createdAt = now;
      var updatedAt = now;
    };
    listings.add(id, listing);
    toPublic(listing);
  };

  public func getListing(
    listings : Map.Map<Common.ListingId, Types.Listing>,
    id : Common.ListingId,
  ) : ?Types.ListingPublic {
    switch (listings.get(id)) {
      case (?l) { ?toPublic(l) };
      case null { null };
    };
  };

  public func updateListing(
    listings : Map.Map<Common.ListingId, Types.Listing>,
    caller : Common.UserId,
    id : Common.ListingId,
    input : Types.ListingInput,
  ) : Types.ListingPublic {
    switch (listings.get(id)) {
      case null { Runtime.trap("Listing not found") };
      case (?listing) {
        if (listing.sellerId != caller) {
          Runtime.trap("Not authorized");
        };
        listing.title := input.title;
        listing.description := input.description;
        listing.category := input.category;
        listing.condition := input.condition;
        listing.price := input.price;
        listing.location := input.location;
        listing.images := input.images;
        listing.updatedAt := Time.now();
        toPublic(listing);
      };
    };
  };

  public func deleteListing(
    listings : Map.Map<Common.ListingId, Types.Listing>,
    caller : Common.UserId,
    id : Common.ListingId,
  ) : () {
    switch (listings.get(id)) {
      case null { Runtime.trap("Listing not found") };
      case (?listing) {
        if (listing.sellerId != caller) {
          Runtime.trap("Not authorized");
        };
        listings.remove(id);
      };
    };
  };

  public func searchListings(
    listings : Map.Map<Common.ListingId, Types.Listing>,
    filter : Types.ListingFilter,
    pagination : Common.Pagination,
  ) : Common.PageResult<Types.ListingPublic> {
    let all = List.empty<Types.ListingPublic>();
    for ((_, listing) in listings.entries()) {
      if (listing.status == #active) {
        let matchesKeyword = switch (filter.keyword) {
          case null { true };
          case (?kw) {
            let kwLower = kw.toLower();
            listing.title.toLower().contains(#text (kwLower)) or listing.description.toLower().contains(#text (kwLower));
          };
        };
        let matchesCategory = switch (filter.category) {
          case null { true };
          case (?cat) { listing.category == cat };
        };
        let matchesMinPrice = switch (filter.minPrice) {
          case null { true };
          case (?min) { listing.price >= min };
        };
        let matchesMaxPrice = switch (filter.maxPrice) {
          case null { true };
          case (?max) { listing.price <= max };
        };
        let matchesLocation = switch (filter.location) {
          case null { true };
          case (?loc) {
            let locLow = loc.toLower();
            listing.location.toLower().contains(#text (locLow));
          };
        };
        let matchesCondition = switch (filter.condition) {
          case null { true };
          case (?cond) { listing.condition == cond };
        };
        if (matchesKeyword and matchesCategory and matchesMinPrice and matchesMaxPrice and matchesLocation and matchesCondition) {
          all.add(toPublic(listing));
        };
      };
    };
    let total = all.size();
    let items = List.empty<Types.ListingPublic>();
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

  public func getFeaturedListings(
    listings : Map.Map<Common.ListingId, Types.Listing>,
    pagination : Common.Pagination,
  ) : Common.PageResult<Types.ListingPublic> {
    let all = List.empty<Types.ListingPublic>();
    for ((_, listing) in listings.entries()) {
      if (listing.status == #active) {
        all.add(toPublic(listing));
      };
    };
    // Sort descending by createdAt (most recent first)
    let arr = all.toArray();
    let sorted = arr.sort(func(a, b) {
      if (a.createdAt > b.createdAt) { #less } else if (a.createdAt < b.createdAt) { #greater } else { #equal };
    });
    let total = sorted.size();
    let items = if (pagination.offset >= total) {
      [];
    } else {
      let endIdx = if (pagination.offset + pagination.limit > total) { total } else { pagination.offset + pagination.limit };
      sorted.sliceToArray(pagination.offset, endIdx);
    };
    { items; total; offset = pagination.offset; limit = pagination.limit };
  };

  public func getListingsBySeller(
    listings : Map.Map<Common.ListingId, Types.Listing>,
    sellerId : Common.UserId,
    pagination : Common.Pagination,
  ) : Common.PageResult<Types.ListingPublic> {
    let all = List.empty<Types.ListingPublic>();
    for ((_, listing) in listings.entries()) {
      if (listing.sellerId == sellerId) {
        all.add(toPublic(listing));
      };
    };
    let total = all.size();
    let items = List.empty<Types.ListingPublic>();
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

  public func getSimilarListings(
    listings : Map.Map<Common.ListingId, Types.Listing>,
    category : Types.ListingCategory,
    location : Text,
    excludeId : Common.ListingId,
    pagination : Common.Pagination,
  ) : Common.PageResult<Types.ListingPublic> {
    let locLower = location.toLower();
    let all = List.empty<Types.ListingPublic>();
    for ((_, listing) in listings.entries()) {
      if (listing.status == #active and listing.id != excludeId and listing.category == category and listing.location.toLower().contains(#text (locLower))) {
        all.add(toPublic(listing));
      };
    };
    let total = all.size();
    let items = List.empty<Types.ListingPublic>();
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

  public func incrementViewCount(
    listings : Map.Map<Common.ListingId, Types.Listing>,
    id : Common.ListingId,
  ) : () {
    switch (listings.get(id)) {
      case null {};
      case (?listing) {
        listing.viewCount += 1;
      };
    };
  };

  public func toPublic(listing : Types.Listing) : Types.ListingPublic {
    {
      id = listing.id;
      sellerId = listing.sellerId;
      title = listing.title;
      description = listing.description;
      category = listing.category;
      condition = listing.condition;
      price = listing.price;
      location = listing.location;
      images = listing.images;
      status = listing.status;
      viewCount = listing.viewCount;
      createdAt = listing.createdAt;
      updatedAt = listing.updatedAt;
    };
  };
};
