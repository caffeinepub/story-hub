import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Iter "mo:core/Iter";

actor {
  type Genre = {
    #love;
    #horror;
    #fantasy;
    #romance;
    #thriller;
    #scienceFiction;
    #historical;
  };

  type Story = {
    title : Text;
    content : Text;
    author : Text;
    genre : Genre;
    creationDate : Time.Time;
    isAIGenerated : Bool;
  };

  // Story module with comparison function
  module Story {
    public func compare(story1 : Story, story2 : Story) : Order.Order {
      Text.compare(story1.title, story2.title);
    };
  };

  let stories = Map.empty<Text, Story>();

  func addAIGeneratedStory(title : Text, content : Text, genre : Genre) {
    let story : Story = {
      title;
      content;
      author = "AI";
      genre;
      creationDate = Time.now();
      isAIGenerated = true;
    };
    stories.add(title, story);
  };

  system func preupgrade() {
    // Add AI-generated stories for each genre
    addAIGeneratedStory("The Stars of Tomorrow", "Content about love set in a futuristic world.", #love);

    addAIGeneratedStory("The Haunting in the Woods", "Content about unexplained horror events.", #horror);

    addAIGeneratedStory("The Dragon's Quest", "Content about fantasy adventures.", #fantasy);

    addAIGeneratedStory("A New Romance", "Content about the journey of two souls.", #romance);

    addAIGeneratedStory("The Silent Witness", "Content about a thrilling investigation.", #thriller);

    addAIGeneratedStory("Mars Frontier", "Content about interplanetary science fiction.", #scienceFiction);

    addAIGeneratedStory("World War II Chronicles", "Content about historical fiction.", #historical);
  };

  public shared ({ caller }) func createStory(title : Text, content : Text, author : Text, genre : Genre) : async () {
    if (stories.containsKey(title)) {
      Runtime.trap("A story with this title already exists.");
    };

    let story : Story = {
      title;
      content;
      author;
      genre;
      creationDate = Time.now();
      isAIGenerated = false;
    };

    stories.add(title, story);
  };

  public query ({ caller }) func getStory(title : Text) : async Story {
    switch (stories.get(title)) {
      case (null) { Runtime.trap("Story not found") };
      case (?story) { story };
    };
  };

  public query ({ caller }) func listAllStories() : async [Story] {
    stories.values().toArray().sort();
  };

  public query ({ caller }) func filterStoriesByGenre(genre : Genre) : async [Story] {
    stories.values().filter(func(story) { story.genre == genre }).toArray().sort();
  };
};
