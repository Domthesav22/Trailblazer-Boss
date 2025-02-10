// netlify_functions/gameData.js (Simplified for logging test)
exports.handler = async function (event, context) {
  console.log("Function triggered! (gameData.js)"); // Added filename to log
  console.log("Event body:", event.body); // Log the raw event body

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Basic function executed and logged! (gameData.js)" }),
  };
};
