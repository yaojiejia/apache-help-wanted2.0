import express, {Request, Response, Router} from "express"
import { findIssues } from "../lib/config/findIssueConfig"
const router = express.Router();

router.get("/issues", async (req:Request, res:Response) => {
    console.log('suceess!')

    try{
        const {tag, language} = req.query
        

        const {result} = await findIssues(tag.toString(), language.toString());
        res.send(result)
    }
    catch(e){
        console.log(e)
    }

})

export default router;