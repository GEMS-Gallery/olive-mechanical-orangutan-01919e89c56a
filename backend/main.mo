import Int "mo:base/Int";

import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Time "mo:base/Time";

actor {
  stable var greeting : Text = "Hello, World!";
  stable var updateCount : Nat = 0;

  public query func getGreeting() : async Text {
    return greeting;
  };

  public func setGreeting(newGreeting : Text) : async () {
    greeting := newGreeting;
    updateCount += 1;
  };

  public query func getUpdateCount() : async Nat {
    return updateCount;
  };

  public query func getCurrentTime() : async Int {
    return Time.now();
  };
}