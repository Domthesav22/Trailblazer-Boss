const { google } = require('googleapis');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    try {
        const body = JSON.parse(event.body);

        // Authenticate with Google Sheets
        const auth = new google.auth.GoogleAuth({
            keyFile: './credentials.json', // Path to your credentials file
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const client = await auth.getClient();
        const sheets = google.sheets({ version: 'v4', auth: client });

        // Replace with your Google Sheet ID and range
        const spreadsheetId = process.env.GOOGLE_SHEET_ID; // Get from environment variable
        const sheetName = 'Trailblazer Form Submissions'; // Your sheet name
        const range = `${sheetName}!A1:AK1000`; // Adjust as needed

        // Prepare the data for the spreadsheet
        const values = [
            [
                "1. Game Title", body.gameTitle,
                "2. Genre(s)", body.genre,
                "3. Platforms", body.platforms,
                "4. Release Date(s)", body.releaseDate,
                "5. Developer(s)", body.developer,
                "6. Publisher(s)", body.publisher,
                "7. Target Audience", body.targetAudience,
                "8. Setting", body.setting,
                "9. Cultural/Social Context", body.context,
                "10. Plot Summary (1-2 sentences)", body.plotSummary,
                "11. Key Plot Events/Twists", body.plotEvents,
                "12. Endings (if multiple, describe differences)", body.endings,
                "13. Protagonist(s) (Details)", body.protagonist,
                "14. Supporting Characters (Roles & Significance)", body.supportingCharacters,
                "15. Antagonist(s) (Motivations & Goals)", body.antagonist,
                "16. Other Notable Entities", body.otherEntities,
                "17. Core Gameplay Mechanics", body.coreMechanics,
                "18. Unique Gameplay Features", body.uniqueFeatures,
                "19. Difficulty & Accessibility", body.difficulty,
                "20. Visual Style", body.visualStyle,
                "21. Audio Design (Music, Sound Effects, Voice Acting)", body.audioDesign,
                "22. Core Themes", body.coreThemes,
                "23. Influences & Inspirations", body.influences,
                "24. World Structure", body.worldStructure,
                "25. World Interactivity", body.worldInteractivity,
                "26. Lore & Backstory", body.lore,
                "27. Critical Reception", body.criticalReception,
                "28. Sales & Commercial Performance", body.sales,
                "29. Industry Influence", body.industryInfluence,
                "30. Personal Experience", body.personalExperience,
                "31. Strengths & Weaknesses (Personal)", body.strengthsWeaknesses,
                "32. Overall Rating/Summary", body.overallRating,
                "33. World Reactivity", body.worldReactivity,
                "34. Replayability Features", body.replayabilityFeatures,
                "35. Community Presence", body.communityPresence,
                "36. Post-Launch Support", body.postLaunchSupport
            ],
        ];

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: 'RAW',
            resource: { values },
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Data saved successfully' }),
        };
    } catch (error) {
        console.error('Error saving data:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to save data', error }),
        };
    }
};
