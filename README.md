# QueryGenie : Natural language to SQL converter

This project enables users to interact with databases using natural language. It translates plain English queries into executable SQL statements using an LLM (Gemini via Monster API), executes them on a database, and returns the results in a human-readable format.

<ins>**Tech Stack :**</ins> 

<ins>Frontend:</ins> React.js\
<ins>Backend:</ins> Node.js + Express (TypeScript)\
<ins>Database:</ins> PostgreSQL\
<ins>LLM:</ins> Gemini (via Monster API)

## Use Case
Ever wondered “How many milk packets do we have?”
Instead of manually writing:

``` SELECT quantity FROM inventory WHERE item_name = 'Milk packet';```

Simply type the question in natural language, and our app will:

1. Convert your question to SQL

2. Execute it on the database

3. Return a friendly response like:

> "Currently, there are 15 packets of Milk in the database."

![Screenshot of a comment on a GitHub issue showing an image, added in the Markdown, of an Octocat smiling and raising a tentacle.]()

References :
LLM (Gemini API) Connection : https://ai.google.dev/gemini-api/docs#javascript
PostGRE connection : https://node-postgres.com/
