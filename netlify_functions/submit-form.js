// netlify/functions/submit-form.js

const { google } = require("googleapis");

exports.handler = async function (event, context) {
  console.log("Function triggered!"); // Log when the function is triggered

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const formData = JSON.parse(event.body);
    console.log("Received form data:", formData); // Log the received form data

    // Extract all the values from the form data
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

    // Log each extracted variable
    console.log("Game Title:", gameTitle);
    console.log("Genre:", genre);
    // ... (log all other variables)

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
      // ... (rest of your data mapping)
    ];

    console.log("Values array:", values); // Log the values array

    // Append the data to the Google Sheet
    console.log("Appending data to sheet...");
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: sheetName,
      valueInputOption: "USER_ENTERED",
      resource: { values },
    });
    console.log("Sheets API response:", response); // Log the API response

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Form submission successful!" }),
    };
  } catch (error) {
    console.error("Error:", error); // Log any errors
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to submit form" }),
    };
  }
};
