import { getJudge0LanguageId, submitBatch, pollBatchResults } from "../libs/judge0.libs.js";
import { prisma } from "../libs/db.js";


export const createProblem = async (req, res)=>{
    const { title, description, difficulty, tags, examples, constraints, testcases, codeSnippets, referenceSolutions } = req.body;
    try {
        // 1. ADMIN submit all the details of createProblem from title, description to referenceSolutions.
        // 2. Run a for loop for each language to check whether the problem is valid or not along by the help of referenceSolutions. For each loop multiple test case will check.
        // 3. If problem get correct output for each test case and language then we create this problem in DB. Else return failed in creating problem.
        // 4. this checking will done by executing the code by the judge0, which also check the execution of user's solution.
        for(const [language, solutionCode] of Object.entries(codeSnippets)){

            // 1. get languageId of each language.
            const languageId = getJudge0LanguageId(language);

            if(!languageId){
                res.status(400).json({
                    error: `Language ${language} is not supported`
                });
            }

            // 2. Prepare Judge0 Submissions for all the testcases that we can send to get the status of each testcases whether it is ACCEPTED or not.
            const submissions = testcases.map(({ input, output })=>({
                source_code: solutionCode,
                language_id: languageId,
                stdin: input,
                expected_output: output
            }));


            // 3. In batch submit all the prepared submissions that will return response that have array of object for all the testcases.
            const submissionResults = await submitBatch(submissions); // returned submission token which can be used to check submission status. // status: 3 means "ACCEPTED"

            // 4. extract token: means convert into array that have token(not object).
            // here, token represent each testcases.
            const tokens = submissionResults.map((res)=> res.token); 
            
            // 5. By the help of token check the status of each testcase. No testcase should be in Queue or Processing.
            // Based on these token we can execute our program until all the testcase have any result except being in Queue or Processing.
            const results = await pollBatchResults(tokens);

            // 6. Then, check whether each testcases ACCEPTED or not?
            for(let i=0; i< results.length; i++){
                const result = results[i];

                if(result.status_id !== 3){
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
export const getProblemById = async (req, res)=>{
    // getProblemById
};
export const updateProblem = async (req, res)=>{
    // updateproblem
};
export const deleteProblem = async (req, res)=>{
    // deleteProblem
};
export const getAllProblemsSolvedByUser = async (req, res)=>{
    // getAllProblemsSolvedByUser
};
