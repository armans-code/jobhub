# How to use:
- All the code for this website is public available above. You can click on the files and folders to view the code.
- To access the live website, please visit https://jobhub-six.vercel.app/.
- To visit the website's admin dashboard, please visit https://jobhub-six.vercel.app/admin. You can log in with the following:
  - email: proof@gmail.com
  - password: Proof@1234
- Feel free to add, remove, and edit any jobs or applicants!
# Breakdown of website's pages:
## Public routes (pages):
- /
  - This is the home page. Here, you can see all the categories and featured jobs for our mock company, ABC Company
- /benefits
  - This is the benefits page, which includes benefits or reasons to work at ABC Company.
- /jobs
  - This is the list of all jobs, where you can click "More Information" on any job. This will take you to the job page.
- /job/[id]
  - This is the job page. Here, you can see specific information for a selected job. You can also hit "Apply Now" to open its job application form.
- /job/[id]/apply
  - This is the job application page. Here, you can add any information about an applicant and hit "submit application". Your application will then be visible in the admin dashboard.
  
## Private routes (password-protected Admin pages): 
- /admin/
  - This is the admin dashboard page. Here, you can see tables for recently added job openings and applicants.
- /admin/jobs
  - This is the admin jobs page. Here, you can see all the jobs you've created, create new ones, or edit existing jobs.
- /admin/jobs/create
  - This is the admin job creation page. Here, you can create a new job opening.
- /admin/applicants
  - This is the admin applicants page. Here, you can view all the applicants and their information. You can reject or block applicants to delete them from the list.
