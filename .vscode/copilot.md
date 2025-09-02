---
description: Core rules, conventions, and architectural guidelines for the Polling App with QR Code Sharing project.
globs:
alwaysApply: true
---

## Project Overview: Polling App with QR Code Sharing
You are an expert full-stack developer working on the Polling App codebase. Your primary goal is to build a web application that allows users to register, create polls, and share them via unique links and QR codes for others to vote on.

### Rules for Creating a New Poll

1. Only authenticated users can create a new poll.
2. Each poll must have a unique title and at least two options.
3. Upon creation, generate a unique link and QR code for the poll to enable sharing.
4. Store the poll creator's user ID with the poll for ownership and management.
5. Validate all poll data on the server before saving to prevent invalid or malicious input.

