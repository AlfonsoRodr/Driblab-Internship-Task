# Driblab-Internship-Task

## Table of Contents
- [Author and Github Repository](#-author-and-github-repository)
- [Instructions](#-instructions)
- [Deployment](#-deployment)
- [Quality Control](#-quality-control)
- [Other Tools](#-other-tools)

## 👤 Author and Github Repository
Alfonso Rodríguez Gutt

You can find more information about this project in the [repository](https://github.com/AlfonsoRodr/Driblab-Internship-Task).

## 📝 Instructions

In this section, it will be explained all the steps you neeed to and the requirements for the proper execution of this project

### 📂 Repository Cloning
In order to clone this repository, you should use the following command:
```bash
git clone https://github.com/AlfonsoRodr/Driblab-Internship-Task.git
```

And finally, locate yourself into the correct folder:
```bash
cd Driblab-Internship-Task
```

### 📋 Requirements
<table>
  <thead>
    <th>Software/tool</th>
    <th>Version</th>
  </thead>
  <tbody>
    <tr>
      <td>Node</td>
      <td>22.1</td>
    </tr>
    <tr>
      <td>npm</td>
      <td>10.9</td>
    </tr>
  </tbody>
</table>

### 🛠️ Frontend Build
First, navigate to the folder that contains the frontend:
```bash
cd frontend
```

To avoid any incoveniences, install all the project dependencies:
```bash
npm install
```

Once the dependencies are installed, you can run the frontend with:
```bash
ng serve --proxy-config proxy.conf.json
```

> [!IMPORTANT]
> It is very important not to run the frontend with `npm start` or `ng serve`, because this will led to `CORS` problems due to the external API, so in order to avoid this, it is important you run the frontend with the proxy configuration.

If everything goes as expected, you will be able to access it at: **http://localhost:4200**

## 🚀 Deployment
The application was deployed using `Vercel`, and it is now accessible at this [URL](https://driblab-internship-task.vercel.app/).

This link is also available in the `About` section of this repository, located on the right-hand side.

## 🧪 Quality Control
To ensure the optimal and correct functioning of the application, a series of unit tests were implemented, independently testing each component and service method. Additionally, to comply with best development practices, an 80% test coverage target was aimed for, and a coverage report was generated, which can be found in this [folder](https://github.com/AlfonsoRodr/Driblab-Internship-Task/tree/main/frontend/coverage/frontend).

Furthermore, to ensure the proper operation of the application in an environment outside of the local machine, a workflow was set up so that on every commit, all application tests are executed within the GitHub Actions environment.

In order to run these unit tests, execute the following command:

> [!IMPORTANT]
> Remember that to run these commands you will need to be located in `/frontend`

```bash
npm run test
# or
ng test
```

And to generate the coverage report:
```bash
npm run test:coverage
```

## 🔧 Other Tools
For the development of this project, various complementary tools were used to support the development process. These are as follows:
- [TailwindCSS](https://tailwindcss.com/)
- [Tailwind Animations](https://tailwindcss-animations.vercel.app/)
- [Vercel](https://vercel.com/)
