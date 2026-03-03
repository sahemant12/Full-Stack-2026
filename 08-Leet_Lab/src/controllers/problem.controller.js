import {
  getJudge0LanguageId,
  submitBatch,
  pollBatchResults,
} from "../libs/judge0.libs.js";

import prisma from "../libs/db.js";

export const createProblem = async (req, res) => {
  // 1. Admin submits all the problem details, from title and description to referenceSolutions.

  // 2. For each language, we run a loop to validate the problem using the referenceSolutions.
  //    In each loop, all testcases are executed.

  // 3. If the reference solution produces the correct output for every testcase in every language,
  //    then we create the problem in the database.
  //    Otherwise, we return an error and do not create the problem.
  // ADMIN should not create broken problem.

  // 4. This validation is done by executing the reference solution using Judge0.
  //    Judge0 is also used later to execute and evaluate users' submissions.
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;
  try {
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      // 1. get languageId of each language. Judge0 does NOT understand "JAVASCRIPT". It needs numeric ID like: JS → 63, Python → 71, Java → 62
      const languageId = getJudge0LanguageId(language);

      if (!languageId) {
        return res.status(400).json({
          error: `Language ${language} is not supported`,
        });
      }

      // 2. Prepare Judge0 Submissions for all the testcases that we can send to get the status of each testcases whether it is ACCEPTED or not.
      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));
      console.log("0submissions: ", submissions);
      // E.g:
      //        0submissions:  [
      //   {
      //     source_code: "Too long so no",
      //     language_id: 63,
      //     stdin: '100 200',
      //     expected_output: '300'
      //   },
      //   {}, {}
      //     ]

      // 3. In batch submit all the prepared submissions that will return array of object that contains 'token' for all the testcases.
      const submissionResults = await submitBatch(submissions); // returned submission token which can be used to check submission status. // status: 3 means "ACCEPTED"
      console.log("0submissionResults: ", submissionResults);
      //  0submissionResults:  [
      //   { token: '6e7be89b-a866-4df2-8fb5-0f1ee5dd065d' },
      //   { token: '1b3c69e6-0a96-4799-989e-d43268a9054e' },
      //   { token: '163a95da-9afb-4658-809a-416c5cd41db8' }
      // ]

      // 4. extract token: means convert into array that have token(not object).
      // here, token represent each testcases.
      const tokens = submissionResults.map((res) => res.token);
      console.log("tokens: ", tokens);
      //       tokens:  [
      //   '8b9d0cab-e5ae-450d-b6ec-d11005e6fb0b',
      //   'df0d6db7-2fce-4465-89e8-ce0516ccd6ca',
      //   '8f42bb89-8f73-463a-9549-cad56b11b435'
      // ]

      // 5. Judge0 execute code in background based on token and will repeatedly check until: Not "In Queue" and "Processing".
      const results = await pollBatchResults(tokens);
      console.log("0results: ", results);
      //        0results: [ {
      //     stdout: '300\n',
      //     time: '0.474',
      //     memory: 13228,
      //     stderr: null,
      //     token: '8b9d0cab-e5ae-450d-b6ec-d11005e6fb0b',
      //     compile_output: null,
      //     message: null,
      //     status: { id: 3, description: 'Accepted' }
      //   }, {}, {}
      //        ]

      // 6. Then, check whether each testcases ACCEPTED or not?
      for (let i = 0; i < results.length; i++) {
        const result = results[i];

        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `Testcase ${i + 1} failed for language ${language}`,
          });
        }
      }
    }

    const newProblem = await prisma.problem.create({
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
        userId: req.user.id,
      },
    });

    return res.status(201).json({
      sucess: true,
      message: "Problem Created Successfully",
      problem: newProblem,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const getAllProblems = async (req, res) => {
  try {
    const problems = await prisma.problem.findMany({
      select: {
        id: true,
        title: true,
        difficulty: true,
        tags: true,
        createdAt: true,
      },
    });

    if (problems.length === 0) {
      return res.status(404).json({
        error: "No problems Found",
      });
    }

    return res.status(200).json({
      sucess: true,
      message: "Message Fetched Successfully",
      problems,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error While Fetching Problems",
    });
  }
};
export const getProblemById = async (req, res) => {
  const id = req.params.id;
  try {
    const problem = await prisma.problem.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        difficulty: true,
        tags: true,
        createdAt: true,
      },
    });

    if (problem.length === 0) {
      return res.status(404).json({ error: "Problem not found." });
    }
    return res.status(200).json({
      sucess: true,
      message: "Message Created Successfully",
      problem,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error While Fetching Problem by id",
    });
  }
};
export const updateProblem = async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;
  const { id } = req.params;
  try {
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);

      if (!languageId) {
        return res.status(400).json({
          error: `Language ${language} is not supported`,
        });
      }

      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submissionResults = await submitBatch(submissions);
      const tokens = submissionResults.map((res) => res.token);

      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];

        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `Testcase ${i + 1} failed for language ${language}`,
          });
        }
      }
    }
    const updatedProblem = await prisma.problem.update({
      where: { id, userId: req.user.id },
      data: {
        title,
        description,
        difficulty,
        tags,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
      },
    });

    return res.status(200).json({
      sucess: true,
      message: "Problem updated Successfully",
      problem: updatedProblem,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
export const deleteProblem = async (req, res) => {
  // deleteProblem
  const { id } = req.params;

  try {
    const problem = await prisma.problem.findUnique({ where: { id } });

    if (problem.length === 0) {
      return res.status(404).json({ error: "Problem Not found" });
    }
    await prisma.problem.delete({ where: { id } });

    return res.status(200).json({
      success: true,
      message: "Problem deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error While deleting the problem",
    });
  }
};
export const getAllProblemsSolvedByUser = async (req, res) => {
  try {
    const allProblems = await prisma.problem.findMany({
      where: {
        solvedBy: {
          some: {
            userId: req.user.id,
          },
        },
      },
      include: {
        solvedBy: {
          where: {
            userId: req.user.id,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Problems fetched successfully",
      allProblems,
    });
  } catch (error) {
    console.error("Error fetching problems :", error);
    res.status(500).json({ error: "Failed to fetch problems" });
  }
};
