### Test Generation and Bug fixing Document.

- **What didn't work?** Well while running the test, the values to check did not match because I have already updated the home page without running any test. Now that i want to run tests, I was given a bug.

- **What worked?** - I traced the test file and located the bug line, I copied the bug line in the test.tsx page then paste it into an AI model, I also copied the home page the test.tsx bug line was refering to and paste it into  the same AI model, then I prompted it to identify the bug given the two separate line of code possibly the error is coming from and VOALA!, the AI model explained the problem and recommended a patch.

- **What surprised Me?** was that I was never thinking about updating the test file, now I know.