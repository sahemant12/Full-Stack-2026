import { getJudge0LanguageId, submitBatch, pollBatchResults } from "../libs/judge0.libs.js";
import { prisma } from "../libs/db.js";


export const createProblem = async (req, res)=>{
    const { title, description, difficulty, tags, examples, constraints, testcases, codeSnippets, referenceSolutions } = req.body;

    // approach
    // check the user role once again(adminMiddleware)
    // to create the problem 1st by ADMIN: gives reference solution of all the language along with testcases and execute it by using judge0.
    // If all the testcases passed for all the language the create the problem.
    try {
        for(const [language, solutionCode] of Object.entries(codeSnippets)){

            const languageId = getJudge0LanguageId(language);

            if(!languageId){
                res.status(400).json({
                    error: `Language ${language} is not supported`
                });
            }

            const submissions = testcases.map(({ input, output })=>({
                source_code: solutionCode,
                language_id: languageId,
                stdin: input,
                expected_output: output
            }));            

            const submissionResults = await submitBatch(submissions); // returned submission token which can be used to check submission status. // status: 3 means "ACCEPTED"

            const tokens = submissionResults.map((res)=> res.token);

            const results = await pollBatchResults(tokens); // check if all the testcases are accepted.

            for(let i=0; i< results.length; i++){
                const result = results[i];

                if(result.status.id !== 3){
                    return res.status(400).json({
                        error: `Testcase ${i+1} failed for language ${language}`
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
            }
        });

    return res.status(201).json({
      sucess: true,
      message: "Problem Created Successfully",
      problem: newProblem,
    });

    } catch (error) {
        return res.status(500).json({
            error: "Error While Creating Problem",
        });
    }
};




export const getAllProblems = async (req, res)=>{
    // get all problems
};
export const getProblemById = async (req, res)=>{};
export const updateProblem = async (req, res)=>{};
export const deleteProblem = async (req, res)=>{};
export const getAllProblemsSolvedByUser = async (req, res)=>{};
