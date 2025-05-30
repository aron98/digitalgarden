---
{"dg-publish":true,"permalink":"/portfolio/blog/increasing-claude-code-s-context-window-for-specific-tasks/","metatags":["description: \"Learn how to improve Claude Code's performance on large tasks by leveraging its documentation capabilities. Discover how to use the /init command, create a CLAUDE.md file, and utilize task-specific markdown files to enhance Claude's understanding and retention of todo lists.\"","\"og:image\": \"https://macrosaas.me/img/user/Portfolio/images/blog-1-og-image.png\""]}
---

I've been experimenting with Claude Code since its release last week. It's a powerful tool, and I'll be writing about how it accelerated my progress on several projects.
However, for larger tasks, such as migrating a large codebase to a new version, it struggles to retain the list of todos.
Fortunately, Anthropic's models excel at understanding and generating documentation, which we can leverage to our advantage. Here's how.
*I will refer to Claude Code as Claude from now on, for simplicity's sake.*
# Understanding the current status

When using Claude in a project for the first time, it suggests to run the `/init` command. 

![claude code init prompt](/img/user/Portfolio/images/claude-code-init.png)

According to the official website, at the time of writing, the description for the `/init` command is

> Initialize project with CLAUDE.md guide. \[1] 

So what does this accomplish?
The `/init` command generates a `CLAUDE.md` file in the project's root directory, serving as a guide for Claude. This file enables Claude to learn about the project's architecture, key concepts, and workflows, facilitating more effective assistance with tasks such as code analysis, refactoring, and documentation.
- **Reads and analyses your current code and architecture:**
	Figures out what language you're using, what framework, reads configuration and important files.
- **Instructs Claude on project specifics:**
    It helps Claude understand the project's architecture, conventions, and patterns.
- **Improves future interactions:**
    By creating a persistent context, Claude can become more effective over time by remembering project-specific information.
- **Enhances Claude's understanding:**
    The `CLAUDE.md` file helps Claude to better understand the project's structure, allowing it to provide more relevant assistance.
- **Facilitates code analysis:**
    The `init` command prepares Claude to accurately analyze the codebase and understand its conventions.

I strongly recommend running the command to improve Claude's understanding of your project. Additionally when you restart Claude, it will read the `CLAUDE.md` file, saving you tokens and allowing it to quickly get up to speed.

# Planning and documenting big tasks

For small, tedious tasks, Claude is great. You give it the task, it creates a small todo list, and gets to work. However, when tackling larger tasks, such as ESM migration for a Node application, Claude may generate an extensive todo list, which it may forget midway through or when you run out of credits.
I found this very frustrating. To work around this, I would copy the todo list and paste it back into the interface when Claude forgot it. Not very efficient.
But with great suffering comes great knowledge - or whatever Uncle Ben said - as an experiment I asked Claude to formulate a very detailed todo list with examples and save it to a task specific markdown, and keep updating it as the task is progressing. You can see an example of this on [my github account](https://github.com/aron98/digitalgarden/blob/main/MIGRATION.md), in the very code that runs this site.
The prompt was very simple:

```
I want you to help me update the dependencies of this project and migrate to ESM. I want you to plan out the steps in detail and document it in the `MIGRATION.md` file in the root directory. When done with a step, indicate it in the documentation, and find the next step. If the list needs to be extended or modified, make sure to keep the documentation up to date.
```

And bam. Thats it. Of course I had to provide some guidance throughout the process, but Claude was able to follow the plan and update the documentation accordingly.

# Tips and Tricks

- One documentation file per task. Let's not confuse Claude.
- Meaningful file names so that the generated documentation can be more understandable for you and for Claude.
- When creating commit messages you can reference this file to generate meaningful content.

\[1] [Claude Code Documentation - Slash commands](https://docs.anthropic.com/en/docs/claude-code/cli-usage#slash-commands)