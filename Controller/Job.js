const JobPosting = require('../Model/JobPosting'); 
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.jobadded = async (req, res) => {
    try {
        
        const { companyId, jobTitle, jobDescription, experienceLevel, endDate, candidates } = req.body;

        const timestamp = Date.now().toString();
        const randomNum = Math.floor(Math.random() * 10000).toString();
        const uniqueId = `${timestamp}${randomNum}`;
        const newJobPosting = new JobPosting({
            companyId,
            jobId:uniqueId,
            jobTitle,
            jobDescription,
            experienceLevel,
            endDate,
            candidates
        });

        
        const savedJobPosting = await newJobPosting.save();

       
        const emailPromises = candidates.map((candidateEmail) => {
            const emailData = {
                from: process.env.EMAIL_FROM,
                to: candidateEmail,
                subject: `New Job Posting: ${jobTitle}`,
                html: `
                    <h1>New Job Opportunity: ${jobTitle}</h1>
                    <p>${jobDescription}</p>
                    <p><strong>Experience Level:</strong> ${experienceLevel}</p>
                    <p><strong>Application Deadline:</strong> ${new Date(endDate).toLocaleDateString()}</p>
                    <hr />
                    <p>If you're interested, please apply before the deadline.</p>
                `,
            };

            
            return sgMail.send(emailData);
        });

       
        await Promise.all(emailPromises);

        
        res.status(200).json({
            success: true,
            message: 'Job posted successfully and notifications sent to candidates',
            job: savedJobPosting
        });

    } catch (error) {
        
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while adding the job posting',
            error: error.message
        });
    }
};
