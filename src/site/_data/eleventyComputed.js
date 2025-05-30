import { getGraph } from "../../helpers/linkUtils.js";
import { getFileTree } from "../../helpers/filetreeUtils.js";
import { userComputed } from "../../helpers/userUtils.js";

export default {
  graph: async (data) => await getGraph(data),
  filetree: (data) => getFileTree(data),
  userComputed: (data) => userComputed(data),
  parsedMetatags: (data) => {
    if (!data.metatags || !Array.isArray(data.metatags)) {
      return null;
    }
    
    const parsed = {};
    data.metatags.forEach(tag => {
      try {
        // Try to parse as JSON object first (for format like "\"og:image\": \"value\"")
        if (tag.trim().startsWith('"') && tag.includes('":')) {
          const jsonObj = JSON.parse(`{${tag}}`);
          Object.assign(parsed, jsonObj);
        } else {
          // Parse as key:value format (for format like "description: \"value\"")
          const colonIndex = tag.indexOf(':');
          if (colonIndex > 0) {
            const name = tag.substring(0, colonIndex).trim();
            const content = tag.substring(colonIndex + 1).trim().replace(/^"/, '').replace(/"$/, '');
            parsed[name] = content;
          }
        }
      } catch (e) {
        // If JSON parsing fails, fall back to key:value parsing
        const colonIndex = tag.indexOf(':');
        if (colonIndex > 0) {
          const name = tag.substring(0, colonIndex).trim();
          const content = tag.substring(colonIndex + 1).trim().replace(/^"/, '').replace(/"$/, '');
          parsed[name] = content;
        }
      }
    });
    
    return Object.keys(parsed).length > 0 ? parsed : null;
  }
};
