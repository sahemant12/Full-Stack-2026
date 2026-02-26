


export const createProblem = async (req, res)=>{
    const { title, description, difficulty, tags, examples, constraints, testcases, codeSnippets, referenceSolutions } = req.body;

    // approach
    // check the user role once again(adminMiddleware)
    try {
        for(const [language, solutionCode] of Object.entries(codeSnippets)){

            const languageId = getJudge0LanguageId(language);

        }
    } catch (error) {
        
    }
};




export const getAllProblems = async (req, res)=>{};
export const getProblemById = async (req, res)=>{};
export const updateProblem = async (req, res)=>{};
export const deleteProblem = async (req, res)=>{};
export const getAllProblemsSolvedByUser = async (req, res)=>{};
