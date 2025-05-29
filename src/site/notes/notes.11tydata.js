import dotenv from "dotenv";
import { ALL_NOTE_SETTINGS } from "../../helpers/constants.js";

dotenv.config();

export default {
  eleventyComputed: {
    layout: (data) => {
      if (data.tags.indexOf("gardenEntry") != -1) {
        return "layouts/index.njk";
      }
      return "layouts/note.njk";
    },
    permalink: (data) => {
      if (data.tags.indexOf("gardenEntry") != -1) {
        return "/";
      }
      return data.permalink || undefined;
    },
    settings: (data) => {
      const noteSettings = {};
      ALL_NOTE_SETTINGS.forEach((setting) => {
        let noteSetting = data[setting];
        let globalSetting = process.env[setting];

        let settingValue =
          noteSetting || (globalSetting === "true" && noteSetting !== false);
        noteSettings[setting] = settingValue;
      });
      return noteSettings;
    },
    created: (data) => {
      return data.created || data.page.date;
    },
    updated: (data) => {
      return data.updated || data.page.date;
    },
  },
};
