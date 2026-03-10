const fs = require("fs");

function fileManagement(filePath, encoding){
    return new Promise((resolve, reject)=>{
        fs.readFile(filePath, encoding, (err, contents)=>{
            if(err){
                reject(err);
            }else{
                contents = contents.trim();
                fs.writeFile(filePath, contents, (err)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve();
                    }
                })
            }
        });
    });
}

async function readFile(){
    await fileManagement("./01_center.html", "utf-8");
    
}
readFile();