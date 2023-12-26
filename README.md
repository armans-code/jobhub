# init!

PUBLIC ROUTES:

- /
  - landing page
  - benefits
  - featured jobs
  - testimonials
- /benefits
  - list of benefits
- /jobs
  - all list of available jobs
  - searchable
- /job/[id]
  - specific job information
  - application form

PRIVATE ROUTES:

- /admin
  - dashboard with metrics
    - number of applicants
    - number of jobs
    - …
- /admin/jobs
  - view list of all jobs, show number of applicants per job
  - archive, delete jobs
- /admin/jobs/[id]
  - view all applicants who applied for specific job
  - view specific job information
  - edit job info, archive job, delete job
  - block applicants
- /admin/applicants
  - view all applicants filtered by job
- /admin/applicants/[id]
  - view information for one specific applicant
  - view all jobs this applicant has applied for
  - block applicant for specific jobs
  - block applicant for all jobs
- /admin/team
  - see all team members
  - remove team members
  - see which team members have accepted, blocked who

future features:

- export to PDF/CSV
- in-site resume viewer
- message applicants within app
