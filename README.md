# Anvaya CRM Dashboard   

A full-stack customer relationship management app where you can add Leads, Sales Agent, Comments. View Detail pages of Leads and Edit them. Filter Leads by Status, Priority and Sort by Time to Close and Priority. Leads by Sales Agent. Lead Report and Setting page to delete Leads and Sales Agent.

Built with React Frontend, Express/Node backend, MongoDB database, Express and React Router. 


---

 
## Demo Link 

[Live Demo](https://my-book-lovers-shop.vercel.app/books) 


---


## Quick Start

```

git clone https://github.com/neelamraikwar9/AnvayaCRMApp.git  
cd <AnvayaCRMApp>
npm install
npm run dev

```


--- 


## Technologies

- React JS 
- React Router
- Node JS
- Express
- MongoDB
- axios
- react-toastify


--- 


## Demo Video

Watch a Walkthrough 
[Loom Video](https://www.loom.com/share/e4bc4296c42948e2b4bdde6e00f87589?sid=5e0991ae-2d88-4f0c-a82f-c5eac57cf714)


---


## Features 

**Home**

 - Displayed Leads.
 - Lead Filter by Status.
 - Add New Lead Button.


 **Lead Management**

 - A Lead Detail with Edit Button.
 - Displayed Comments and a Form to Add New Comment.
 - Back to Dashboard Button.

 **Lead List**
 - Display All Leads in a list. When click to a lead then it moves to Lead Detail Page.
 - Filter Leads by Sales Agent and Sort by Priority.
 - Add New Lead Button.


 **Sales Agent Management**

 - Display All Sales Agent.
 - Add New Sales Agent Button.


 **Report**

 - Total closed Leads and Leads in Pipeline.
 - Leads Closed by Sales Agent.
 - Lead Status Distribution.


 **Lead Status View**

 - Displaye Leads with the status 'Qualified'.
 - Leads Filter by Priority.
 - Leads Sort by Time to Close.


 **Sales Agent View**

 - Displayed Leads by a Sales Agent.
 - Lead Filter by Priority.  
 - Lead Filter by Time to Close.  


 **Setting**

 - View all Leads and Sales agent with Delete Button.
 - Edit Recipe etch. 


 **Lead Details**

 - View all Lead details. (Created At, Updated At etc.)
 - Edit Lead Button and Back to Dashboard Button. 


 ---


 ## API Refrence

 ### GET /[api/leads](https://anvaya-model-references-apis-backen.vercel.app/leads)<br/>

 List  of all Leads <br/>  

 Sample Response: <br/>
 
 ```

[{ _id, name, source, salesAgent, status, tags}, ....] 


 ```


 ### GET /[api/salesAgent](https://anvaya-model-references-apis-backen.vercel.app/salesAgent)<br/>

 List of all Sales Agent <br/>  

 Sample Response: <br/>
 
 ```

[{ _id, name, email}...] 


 ```


 ### GET /[api/leads/status/:status](https://anvaya-model-references-apis-backen.vercel.app/leads/status/Qualified) <br/>

 Leads by status <br/>  

 Sample Response: <br/>
 
 ```

[{ _id, name, source, salesAgent, status, tags}, ....] 

 ```
 

### GET /[api/leads/:id](https://anvaya-model-references-apis-backen.vercel.app/leads/68f305f872ca23fcae85d083)<br/>

 Get a Lead by Id <br/> 

 Sample Response: <br/>
 
 ```

{ _id, name, source, salesAgent, status, tags...}


 ```


 ### GET /[api/leads/agent/:agentId](https://anvaya-model-references-apis-backen.vercel.app/leads/agent/68e49fdf24fcc90c8e77b5bb) <br/>

 Get Leads by Sales Agent.<br/> 

 Sample Response: <br/>
 
 ```

[{ _id, name, source, salesAgent, status, tags}...]


 ```


  ### GET /[api/comments](https://anvaya-model-references-apis-backen.vercel.app/comments) <br/>

 Get Comments.<br/> 

 Sample Response: <br/>
 
 ```

[{ _id, lead, author, commentText}...]


 ```



 ### GET /[api/leads/report/pipeline](https://anvaya-model-references-apis-backen.vercel.app/leads/report/pipeline) <br/>

 Get numbers of total Leads in the pipeline.<br/> 

 Sample Response: <br/>
 
 ```

{"totalLeadsInPipeline":26}


 ```


 ### GET /[api/leads/report/closedLeads/pipeline](https://anvaya-model-references-apis-backen.vercel.app/leads/report/closedLeads/pipeline)** <br/>

 Get numbers of total Closed Leads in the pipeline.<br/> 

 Sample Response: <br/>
 
 ```

{"totalClosedLeadsInPipeline":1}

 ```



 ### POST /[api/leads/:leadID](https://anvaya-model-references-apis-backen.vercel.app/leads/${leadID}) <br/>

 Update the Lead by the Id.<br/> 

 Sample Response: <br/>
 
 ```

{ _id, name, source, salesAgent, status, tags...}

 ```


### POST /[api/leads/comments](https://anvaya-model-references-apis-backen.vercel.app/comments)<br/>

 Add the Comments.<br/> 

 Sample Response: <br/>
 
 ```

[{ _id, lead, author, commentText}...]

 ```


 ### POST /[api/leads](https://anvaya-model-references-apis-backen.vercel.app/leads)<br/>

 Add new Leads.<br/> 

 Sample Response: <br/>
 
 ```

[{ _id, name, source, salesAgent, status, tags}, ....] 

 ```


 ### POST /[api/leads/salesAgent](https://anvaya-model-references-apis-backen.vercel.app/salesAgent)<br/>

 Add new Sales Agent.<br/> 

 Sample Response: <br/>
 
 ```

[{ _id, name, source, salesAgent, status, tags}...]

 ```


 ### Delete [/api/leads/:Id](https://anvaya-model-references-apis-backen.vercel.app/leads/${leadId}) <br/>

 Delete Leads by Id.

 Sample Response: <br/>
 
 ```

{ }

 ```


 ### Delete [/api/salesAgent/:Id](https://anvaya-model-references-apis-backen.vercel.app/salesAgent/${agentId}) <br/>

 Delete Sales Agent by Id.

 Sample Response: <br/>
 
 ```

{ }

 ```


 --- 


 ## Contact
 
 For bugs or feature request, please reach out to neelam.raikwar.234303@gmail.com
 
 




