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
            console.log("0submissions: ", submissions);
            

            // 3. In batch submit all the prepared submissions that will return response that have array of object for all the testcases.
            const submissionResults = await submitBatch(submissions); // returned submission token which can be used to check submission status. // status: 3 means "ACCEPTED"
            console.log("0submissionResults: ", submissionResults);
            

            // 4. extract token: means convert into array that have token(not object).
            // here, token represent each testcases.
            const tokens = submissionResults.map((res)=> res.token); 
            console.log("tokens: ", tokens);
            
            
            // 5. By the help of token check the status of each testcase. No testcase should be in Queue or Processing.
            // Based on these token we can execute our program until all the testcase have any result except being in Queue or Processing.
            const results = await pollBatchResults(tokens);
            console.log("0results: ", results);
            

            // 6. Then, check whether each testcases ACCEPTED or not?
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
    try {
        const problems = await prisma.problem.findMany({
            include: {
                solvedBy: {
                    userId: req.user.id
                }
            }
        });


    if (!problems) {
      return res.status(404).json({
        error: "No problems Found",
      });
    }

    res.status(200).json({
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
export const getProblemById = async (req, res)=>{

    const id = req.params;
    try {
        const problem = await prisma.user.findUnique({
            where: {id},
        });

    if(!problem){
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
export const updateProblem = async (req, res)=>{
    // updateproblem
};
export const deleteProblem = async (req, res)=>{
    // deleteProblem
    const {id} = req.params;
    
    try {
        const problem = await prisma.problem.findUnique({where: id});

        if (!problem) {
            return res.status(404).json({ error: "Problem Not found" });
        }
        await prisma.problem.delete({where: {id}});

        res.status(200).json({
            success: true,
            message: "Problem deleted Successfully",
        });        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
      error: "Error While deleting the problem",
    });
    }
};
export const getAllProblemsSolvedByUser = async (req, res)=>{
    
    try {
        const allProblems = await prisma.problem.findMany({
            where: {
                solvedBy: {
                    some: {
                        userId:req.user.id
                    }
                }
            },
            include: {
                solvedBy:{
                    where:{
                        userId:req.user.id
                    }
                }
            }
        });

    res.status(200).json({
      success:true,
      message:"Problems fetched successfully",
      allProblems
    })
    } catch (error) {
        console.error("Error fetching problems :" , error);
        res.status(500).json({error:"Failed to fetch problems"})
    }
};
