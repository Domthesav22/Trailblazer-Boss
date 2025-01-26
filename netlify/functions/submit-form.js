// netlify/functions/submit-form.js

const { google } = require("googleapis");

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // Parse the form data from the request body
    const formData = JSON.parse(event.body);

    // Extract all the values from the form data (Correctly extracted)
    const gameTitle = formData.gameTitle;
    const genre = formData.genre;
    const platforms = formData.platforms;
    const releaseDate = formData.releaseDate;
    const developer = formData.developer;
    const publisher = formData.publisher;
    const targetAudience = formData.targetAudience;
    const setting = formData.setting;
    const context = formData.context;
    const plotSummary = formData.plotSummary;
    const plotEvents = formData.plotEvents;
    const endings = formData.endings;
    const protagonist = formData.protagonist;
    const supportingCharacters = formData.supportingCharacters;
    const antagonist = formData.antagonist;
    const otherEntities = formData.otherEntities;
    const coreMechanics = formData.coreMechanics;
    const uniqueFeatures = formData.uniqueFeatures;
    const difficulty = formData.difficulty;
    const visualStyle = formData.visualStyle;
    const audioDesign = formData.audioDesign;
    const coreThemes = formData.coreThemes;
    const influences = formData.influences;
    const worldStructure = formData.worldStructure;
    const worldInteractivity = formData.worldInteractivity;
    const lore = formData.lore;
    const criticalReception = formData.criticalReception;
    const sales = formData.sales;
    const industryInfluence = formData.industryInfluence;
    const personalExperience = formData.personalExperience;
    const strengthsWeaknesses = formData.strengthsWeaknesses;
    const overallRating = formData.overallRating;
    const worldReactivity = formData.worldReactivity;
    const replayabilityFeatures = formData.replayabilityFeatures;
    const communityPresence = formData.communityPresence;
    const postLaunchSupport = formData.postLaunchSupport;

    // Authenticate with Google Sheets (using environment variables)
    const credentials = {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"), // Correctly replaces newline characters
    };

    const auth = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    const sheets = google.sheets({ version: "v4", auth });

    // Your Google Sheet ID and sheet name
    const spreadsheetId = process.env.GOOGLE_SHEET_ID; // Correctly uses environment variable
    const sheetName = "Trailblazer Form Submissions"; //  Make sure this matches your actual sheet name

    // Map form data to sheet columns (Correctly mapped)
    const values = [
      ["1. Game Title", gameTitle],
      ["2. Genre(s)", genre],
      ["3. Platforms", platforms],
      ["4. Release Date(s)", releaseDate],
      ["5. Developer(s)", developer],
      ["6. Publisher(s)", publisher],
      ["7. Target Audience", targetAudience],
      ["8. Setting", setting],
      ["9. Cultural/Social Context", context],
      ["10. Plot Summary (1-2 sentences)", plotSummary],
      ["11. Key Plot Events/Twists", plotEvents],
      ["12. Endings (if multiple, describe differences)", endings],
      ["13. Protagonist(s) (Details)", protagonist],
      ["14. Supporting Characters (Roles & Significance)", supportingCharacters],
      ["15. Antagonist(s) (Motivations & Goals)", antagonist],
      ["16. Other Notable Entities", otherEntities],
      ["17. Core Gameplay Mechanics", coreMechanics],
      ["18. Unique Gameplay Features", uniqueFeatures],
      ["19. Difficulty & Accessibility", difficulty],
      ["20. Visual Style", visualStyle],
      ["21. Audio Design (Music, Sound Effects, Voice Acting)", audioDesign],
      ["22. Core Themes", coreThemes],
      ["23. Influences & Inspirations", influences],
      ["24. World Structure", worldStructure],
      ["25. World Interactivity", worldInteractivity],
      ["26. Lore & Backstory", lore],
      ["27. Critical Reception", criticalReception],
      ["28. Sales & Commercial Performance", sales],
      ["29. Industry Influence", industryInfluence],
      ["30. Personal Experience", personalExperience],
      ["31. Strengths & Weaknesses (Personal)", strengthsWeaknesses],
      ["32. Overall Rating/Summary", overallRating],
      ["33. World Reactivity", worldReactivity],
      ["34. Replayability Features", replayabilityFeatures],
      ["35. Community Presence", communityPresence],
      ["36. Post-Launch Support", postLaunchSupport],
    ];

    // Append the data to the Google Sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: sheetName,
      valueInputOption: "USER_ENTERED",
      resource: { values },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Form submission successful!" }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode
