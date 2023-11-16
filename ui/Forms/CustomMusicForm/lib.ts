const sampleText =
  "For Businesses: Enterprises seeking the perfect musical backdrop for their commercial needs.";
const forBusinessList = "Production Company, Agency, Brand, Non-Profit";
const forCreatorsSub =
  "Creators: Individuals and artists looking to enhance their projects with our music.";
const forCreatorsList =
  "Freelancers, YouTubers, Filmmakers, Podcasters, Social Media Influencers, Dancers and Choreographers, Educators";
export {
  sampleText,
  forBusinessList,
  forCreatorsList,
  forCreatorsSub,
  questions,
};

const questions = [
  {
    q: "What type of license is needed?",
    options: ["Individual", "Business"],
  },
  {
    q: "How big is your company?",
    options: [
      {
        size: "Small",
        count: "1-50",
      },
      {
        size: "Medium",
        count: "51-250",
      },
      {
        size: "Large",
        count: "250+",
      },
    ],
  },
  {
    q: "What is your intended use?",
    options: [
      "Web/Social",
      "Industrial",
      "Internal",
      "Podcast",
      "VOD/OTT",
      "Film Festival",
      "Video Games",
      "Broadcast",
    ],
  },
  {
    q: "Please provide your brief, requirements, or any references below",
    options: undefined,
  },
];
