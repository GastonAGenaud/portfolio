import { ExperienceSectionType } from '@/lib/types/sections'

export const experienceSection: ExperienceSectionType = {
    title: "where i've worked",
    experiences: [
        {
          company: "Darwoft",
          companyUrl: "https://www.darwoft.com/",
          role: "Software Development in Test Engineer & Tech Lead",
          started: "August 2022",
          upto: "present",
          tasks: [
            "Mobile automation with Appium, Python, Pytest, and Behave.",
            "Continuous integration with CircleCI, Implementation of parallel tests with CypressIO and CircleCI.",
            "Load testing (Artillery and JMeter)",
            "Lead a cross-functional team of developers and QA Automation.",
            "Creation of Lambda (Python), Management of Dynamo, RDS, configuration, CloudWatch configuration, Taurus implementation (AWS Load Testing)."
          ]
        },
        {
          company: "Coderio | Software Company",
          companyUrl: "https://coderio.co/",
          role: "SSr QA Automation Engineer & DevOps Engineer",
          started: "September 2021",
          upto: "August 2022",
          tasks: [
            "Frontend automation, Backend automation, test case design.",
            "Automation for Dynamo, RDS, S3 and CloudWatch tests.",
            "Creation of Lambdas.",
            "Use of Screenplay Pattern, POM Pattern, Serenity BDD, Selenium, Cypress in Java and Javascript."
          ]
        },
        {
          company: "SearchMAS",
          companyUrl: "",
          role: "Ssr QA Automation Engineer & QA Lead",
          started: "September 2020",
          upto: "March 2021",
          tasks: [
            "Frontend Automation, Backend Automation (GraphQL), Test Case Design (GraphQL), test case design, test plan design, team leader.",
            "Stack: GraphQL, REST API, MongoDB, Docker, AWS (EC2, AMPLIFY), Just-API, Mongo-memory-server, Appium, Jest, Mocha, Chai, and Testcafe.",
            "POM Pattern, Serenity BDD, Selenium, Cucumber. TestNG, Java.",
            "Integration of reporting frameworks: mocha-awesome, cucumber-html-reporter"
          ]
        },
        {
          company: "Globant",
          companyUrl: "https://www.globant.com/",
          role: "Ssr Test Automation Engineer",
          started: "March 2020",
          upto: "September 2020",
          tasks: [
            "Frontend automation, Backend automation of banking microservices (GraphQL), test case design, test plan design, team leader.",
            "Stack: Yadda, Supertest, Mocha and Cucumber, microservices (API-REST) and Axios.",
            "Language: Node.js and JavaScript"
          ]
        },
        {
          company: "VATES - Software",
          companyUrl: "https://www.vates.com/",
          role: "QA Automation Engineer",
          started: "August 2018",
          upto: "March 2020",
          tasks: [
            "Backend automation of service layer and various microservices with frameworks such as Serenity, Cucumber Rest Assured in JAVA, and using HPE UFT for various automations.",
            "Project: BANCOR - Role: JR Testing Analyst - Tasks: Requirements analysis, design and execution of test cases with HP ALM and Agile methodologies (Scrum).",
            "Project: Bci Insurance - Role: JR Testing Analyst - Tasks: Functional, System and User Acceptance Testing, Review and Execution of system and business test cases, smoke tests and end-user support."
          ]
        }
      ]
};