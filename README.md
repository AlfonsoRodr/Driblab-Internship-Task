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

---

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

> [!WARNING]
> For security reasons, the `API_KEY` is not included in the repository (as shown in the [gitignore file](https://github.com/AlfonsoRodr/Driblab-Internship-Task/blob/main/frontend/.gitignore)). This means that, if you want to run the application locally, you will need to manually create the file that is ignored by Git.
> <br> <br>
> However, since the application is deployed on `Vercel` (see the [Deployment Section](#-deployment)), there is no need to modify anything in the code when accessing the live version.

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


> [!WARNING]
> As explained earlier, this is not the recommended way to access the application. In fact, the application will not start unless you manually provide the file that is ignored by Git.
> To access the application properly, please refer to the next section, where the deployment URL is provided.

---

## 🚀 Deployment
To facilitate access to the application, improve performance, and support a more elegant and professional web development workflow, the project has been deployed online. The deployment was carried out using `Vercel`, a cloud platform designed for fast, reliable, and scalable frontend applications.

The application is now available at the following [URL](https://driblab-internship-task.vercel.app/).

This link can also be found in the About section of this repository, located on the right-hand side.

---

## 🧪 Quality Control
To ensure the optimal and correct functioning of the application, a series of unit tests were implemented, independently testing each component and service method. Additionally, to comply with best development practices, an 80% test coverage target was aimed for, and a coverage report was generated, which can be found in this [folder](https://github.com/AlfonsoRodr/Driblab-Internship-Task/tree/main/frontend/coverage/frontend).

Furthermore, to ensure the proper operation of the application in an environment outside of the local machine, a workflow was set up so that on every commit, all application tests are executed within the GitHub Actions environment. To ensure that these workflows run correctly, two `GitHub Secrets` have been configured, providing the API URL and the API key required by the application.

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

---

## 🔧 Other Tools
For the development of this project, various complementary tools were used to support the development process. These are as follows:
- [TailwindCSS](https://tailwindcss.com/)
- [Tailwind Animations](https://tailwindcss-animations.vercel.app/)
- [Vercel](https://vercel.com/)
