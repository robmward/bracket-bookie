const GH_TOKEN = process.env.GH_TOKEN;
const GH_OWNER = "robmward";
const GH_REPO  = "bracket-bookie";
const GH_FILE  = "src/data/gamedata.json";
const GH_API   = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${GH_FILE}`;

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  const ghHeaders = {
    "Authorization": `token ${GH_TOKEN}`,
    "Accept": "application/vnd.github.v3+json",
    "Content-Type": "application/json"
  };

  try {
    if (event.httpMethod === "GET") {
      const res = await fetch(GH_API, { headers: ghHeaders });
      if (!res.ok) return { statusCode: res.status, headers, body: JSON.stringify({ error: "GH read failed" }) };
      const json = await res.json();
      const data = JSON.parse(Buffer.from(json.content, "base64").toString());
      return { statusCode: 200, headers, body: JSON.stringify({ data, sha: json.sha }) };
    }

    if (event.httpMethod === "PUT") {
      const { data, sha } = JSON.parse(event.body);
      const content = Buffer.from(JSON.stringify(data, null, 2)).toString("base64");
      const body = JSON.stringify({ message: "Update game data", content, sha });
      const res = await fetch(GH_API, { method: "PUT", headers: ghHeaders, body });
      if (!res.ok) {
        const err = await res.text();
        return { statusCode: res.status, headers, body: JSON.stringify({ error: err }) };
      }
      const json = await res.json();
      return { statusCode: 200, headers, body: JSON.stringify({ sha: json.content.sha }) };
    }

    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
