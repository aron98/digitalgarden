const sortTree = (unsorted) => {
  //Sort by folder before file, then by creation date for notes, then by name
  const orderedTree = Object.keys(unsorted)
    .sort((a, b) => {

      let a_pinned = unsorted[a].pinned || false;
      let b_pinned = unsorted[b].pinned || false;
      if (a_pinned != b_pinned) {
        if (a_pinned) {
          return -1;
        } else {
          return 1;
        }
      }

      const a_is_note = a.indexOf(".md") > -1;
      const b_is_note = b.indexOf(".md") > -1;

      if (a_is_note && !b_is_note) {
        return 1;
      }

      if (!a_is_note && b_is_note) {
        return -1;
      }

      // If both are notes, sort by creation date (newest first)
      if (a_is_note && b_is_note) {
        const a_date = unsorted[a].createdDate;
        const b_date = unsorted[b].createdDate;
        
        if (a_date && b_date) {
          const dateA = new Date(a_date);
          const dateB = new Date(b_date);
          // Sort by newest first (descending order)
          return dateB - dateA;
        }
        
        // If one has a date and the other doesn't, prioritize the one with a date
        if (a_date && !b_date) return -1;
        if (!a_date && b_date) return 1;
      }

      //Regular expression that extracts any initial decimal number
      const aNum = parseFloat(a.match(/^\d+(\.\d+)?/));
      const bNum = parseFloat(b.match(/^\d+(\.\d+)?/));

      const a_is_num = !isNaN(aNum);
      const b_is_num = !isNaN(bNum);

      if (a_is_num && b_is_num && aNum != bNum) {
        return aNum - bNum; //Fast comparison between numbers
      }

      if (a.toLowerCase() > b.toLowerCase()) {
        return 1;
      }

      return -1;
    })
    .reduce((obj, key) => {
      obj[key] = unsorted[key];

      return obj;
    }, {});

  for (const key of Object.keys(orderedTree)) {
    if (orderedTree[key].isFolder) {
      orderedTree[key] = sortTree(orderedTree[key]);
    }
  }

  return orderedTree;
};

function getPermalinkMeta(note) {
  let permalink = "/";
  let parts = note.filePathStem.split("/");
  let name = parts[parts.length - 1];
  let noteIcon = process.env.NOTE_ICON_DEFAULT;
  let hide = false;
  let pinned = false;
  let folders = null;
  let createdDate = null;
  try {
    if (note.data.permalink) {
      permalink = note.data.permalink;
    }
    if (note.data.tags && note.data.tags.indexOf("gardenEntry") != -1) {
      permalink = "/";
    }    
    if (note.data.title) {
      name = note.data.title;
    }
    if (note.data.noteIcon) {
      noteIcon = note.data.noteIcon;
    }
    // Reason for adding the hide flag instead of removing completely from file tree is to
    // allow users to use the filetree data elsewhere without the fear of losing any data.
    if (note.data.hide) {
      hide = note.data.hide;
    }
    if (note.data.pinned) {
      pinned = note.data.pinned;
    }
    // Get creation date - prefer frontmatter 'created', fallback to Eleventy's date
    createdDate = note.data.created || note.date;
    if (note.data["dg-path"]) {
      folders = note.data["dg-path"].split("/");
    } else {
      folders = note.filePathStem
        .split("notes/")[1]
        .split("/");
    }
    folders[folders.length - 1]+= ".md";
  } catch {
    //ignore
  }

  return [{ permalink, name, noteIcon, hide, pinned, createdDate }, folders];
}

function assignNested(obj, keyPath, value) {
  const lastKeyIndex = keyPath.length - 1;
  for (var i = 0; i < lastKeyIndex; ++i) {
    const key = keyPath[i];
    if (!(key in obj)) {
      obj[key] = { isFolder: true };
    }
    obj = obj[key];
  }
  obj[keyPath[lastKeyIndex]] = value;
}

function getFileTree(data) {
  const tree = {};
  (data.collections.note || []).forEach((note) => {
    const [meta, folders] = getPermalinkMeta(note);
    assignNested(tree, folders, { isNote: true, ...meta });
  });
  const fileTree = sortTree(tree);
  
  // If the entire tree is wrapped in a single root folder, return its children instead
  const rootKeys = Object.keys(fileTree);
  if (rootKeys.length === 1 && fileTree[rootKeys[0]].isFolder) {
    const rootFolderContents = fileTree[rootKeys[0]];
    // Remove the isFolder property from the root and return its contents
    const { isFolder, ...contents } = rootFolderContents;
    return contents;
  }
  
  return fileTree;
}

export { getFileTree };
