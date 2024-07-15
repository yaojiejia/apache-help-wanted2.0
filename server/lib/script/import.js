import axios from 'axios';
import { JSDOM } from 'jsdom';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const url = 'https://github.com/blakeblackshear/frigate/issues?page=4&q=is%3Aissue+is%3Aopen';

async function insertIssues(url) {
    try {
        const response = await axios.get(url);
        const dom = new JSDOM(response.data);
        const issueElements = dom.window.document.querySelectorAll('.js-issue-row');

        for (const issueElement of issueElements) {
            // Your existing logic here
            const issueNameElement = issueElement.querySelector('.Link--primary.v-align-middle');
            const issueName = issueNameElement ? issueNameElement.textContent.trim() : 'No title found';
            const issueLinkElement = issueElement.querySelector('.Link--primary.v-align-middle');
            const issueLink = issueLinkElement ? 'https://github.com' + issueLinkElement.getAttribute('href') : 'No link found';
            const issueTagsElements = issueElement.querySelectorAll('.IssueLabel');
            let issueTags = Array.from(issueTagsElements).map(tagElement => tagElement.textContent.trim()).join(', ').toLowerCase();
            
            // Assuming you have a logic to create an issue in your database
            if (issueTags){
            await prisma.Issue.create({
                data:{
                    name: issueName,
                    link: issueLink,
                    language: 'python',
                    tag: issueTags
                    
                }
            });
        }

            console.log('Issue Name:', issueName);
            console.log('Issue Link:', issueLink);
            console.log('Issue Tags:', issueTags);
            console.log();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

insertIssues(url).catch(console.error);