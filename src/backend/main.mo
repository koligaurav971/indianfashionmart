import Map "mo:core/Map";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import Common "types/common";
import UserTypes "types/users";
import ListingTypes "types/listings";
import MsgTypes "types/messaging";
import UsersMixin "mixins/users-api";
import ListingsMixin "mixins/listings-api";
import MessagingMixin "mixins/messaging-api";
import Principal "mo:core/Principal";

actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState, null);

  // Object storage
  include MixinObjectStorage();

  // Users
  let userProfiles = Map.empty<Common.UserId, UserTypes.UserProfile>();
  include UsersMixin(accessControlState, userProfiles);

  // Listings
  let listings = Map.empty<Common.ListingId, ListingTypes.Listing>();
  let listingState = { var nextListingId = 0 };
  include ListingsMixin(accessControlState, listings, listingState);

  // Messaging
  let conversations = Map.empty<Common.ConversationId, MsgTypes.Conversation>();
  let messages = Map.empty<Common.MessageId, MsgTypes.Message>();
  let msgState = { var nextConversationId = 0; var nextMessageId = 0 };
  include MessagingMixin(accessControlState, conversations, messages, msgState);

  // Sample data initialization
  let sampleSellerId : Common.UserId = Principal.fromText("aaaaa-aa");
  do {
    let now = Time.now();
    let sampleListings : [(Text, Text, ListingTypes.ListingCategory, ListingTypes.ListingCondition, Nat, Text)] = [
      ("Banarasi Silk Saree - Royal Blue", "Beautiful handwoven Banarasi silk saree with gold zari work. Worn only once at a family wedding. Comes with blouse piece. Perfect for festive occasions.", #sarees, #likeNew, 4500, "Varanasi"),
      ("Kanjeevaram Silk Saree - Green", "Authentic Kanjeevaram silk saree in deep green with traditional temple border. Purchased from a reputed store, worn twice. Original price was Rs 12,000.", #sarees, #good, 5500, "Chennai"),
      ("Cotton Kurti Set - Floral Print", "Set of 3 cotton kurtis in floral prints, sizes M and L available. Gently used, washed and ready. Great for daily wear and office.", #kurtis, #good, 800, "Mumbai"),
      ("iPhone 13 - 128GB", "Apple iPhone 13, 128GB storage, Midnight color. In excellent working condition with minor scratches on back. Comes with original charger and box.", #other, #good, 45000, "Delhi"),
      ("Wooden Dining Table - 6 Seater", "Solid sheesham wood dining table with 6 chairs. 5 years old, good condition. Minor wear on chairs. Relocating so selling at low price.", #other, #fair, 18000, "Bangalore"),
      ("Children's Books Bundle - 20 Books", "Collection of 20 children's books including Panchatantra, Amar Chitra Katha and English story books. Ages 5-12. All in good condition.", #other, #good, 600, "Pune"),
      ("Lehenga Choli - Red Bridal", "Beautiful red bridal lehenga with heavy embroidery and mirror work. Size 38. Worn once at a relative's wedding. Includes dupatta and blouse.", #lehengas, #likeNew, 8000, "Jaipur"),
      ("Wooden Toys Set for Kids", "Set of educational wooden toys including alphabet blocks, shape sorter, and puzzle set. Safe for kids 2+. Lightly used and in excellent condition.", #other, #likeNew, 1200, "Hyderabad"),
    ];
    for ((title, desc, cat, cond, price, loc) in sampleListings.values()) {
      let id = listingState.nextListingId;
      listingState.nextListingId += 1;
      let listing : ListingTypes.Listing = {
        id;
        sellerId = sampleSellerId;
        var title;
        var description = desc;
        var category = cat;
        var condition = cond;
        var price;
        var location = loc;
        var images = [];
        var status = #active;
        var viewCount = 0;
        createdAt = now;
        var updatedAt = now;
      };
      listings.add(id, listing);
    };
  };
};

