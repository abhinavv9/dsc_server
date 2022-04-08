# DSC_AKGEC_WEBSITE_server

# Routes
----
## Post Routes:
  - #### Create Post - /api/post/new
    - form data fields
      - title, content, postImage(type: file), category
  - #### Get all posts - /api/posts
  - #### Get post detail - /api/post/id
---
## Team Routes:
  - #### Create Member - /api/team/new
    - form data fields
      - id, year, domain, cardName, cardDesignation, teamImage, links: {github, linkedin},
  - #### Get all members - /api/team
  - #### Get member detail - /api/team/id
---  
## Alumni Routes:
  - #### Create Alumni - /api/alumni/new
    - form data fields
      - id, year, domain, cardName, cardDesignation, alumniImage, links: {github},
  - #### Get all alumni - /api/alumni
  - #### Get alumni detail - /api/alumni/id
---
