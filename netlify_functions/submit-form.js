// netlify/functions/submit-form.js
const { google } = require("googleapis");

exports.handler = async function (event, context) {
  console.log("Function triggered!");

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const formData = JSON.parse(event.body);
    console.log("Received form data:", formData);

    // Extract all form data
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

    // Google Sheets Authentication
    const credentials = {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    };

    const auth = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const sheetName = "Trailblazer Form Submissions"; // Verify this!

    // Correct Data Mapping (only the values, not the questions)
    const values = [
      [
        gameTitle,
        genre,
        platforms,
        releaseDate,
        developer,
        publisher,
        targetAudience,
        setting,
        context,
        plotSummary,
        plotEvents,
        endings,
        protagonist,
        supportingCharacters,
        antagonist,
        otherEntities,
        coreMechanics,
        uniqueFeatures,
        difficulty,
        visualStyle,
        audioDesign,
        coreThemes,
        influences,
        worldStructure,
        worldInteractivity,
        lore,
        criticalReception,
        sales,
        industryInfluence,
        personalExperience,
        strengthsWeaknesses,
        overallRating,
        worldReactivity,
        replayabilityFeatures,
        communityPresence,
        postLaunchSupport,
      ],
    ];

    console.log("Values array:", values);

    // Append to Google Sheet
    console.log("Appending data to sheet...");
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: sheetName,
      valueInputOption: "USER_ENTERED",
      resource: { values },
    });
    console.log("Sheets API response:", response);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Form submission successful!" }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to submit form" }),
    };
  }
};
