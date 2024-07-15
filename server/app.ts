import express from "express"
// import {IssueRouter} from "./routes/getIssuesRoute"
import issueRoute from "./routes/getIssuesRoute"
const app = express()

app.use("/get", issueRoute)

app.listen("3000", ()=>{
    console.log("running on 3000")
})