# Installation Instructions

To install the system, the user has to do the following:

## Pre-Requisites
- Make sure to have C++ on your machine.
- Python & pip installed
- Make sure to create a ```.env``` file in the ```/src``` folder and add: ```OPEN_AI_KEY=<your-key>```

## Setting up the frontend
Details to run, build, and install the ReactJS frontend, enter the folder ```rapidcare-frontend``` and see the README.md. Below is overview of installing and running the application
- To install dependencies, the user has to run ```npm install --legacy-peer-deps```.
- To start the application, run: ```npm start```

## Setting up FFMPEG for backend
- Install ffmpeg for Windows by navigating to this link: https://ffmpeg.org/download.html
- Extract the ZIP file and add it to your system path.
- To add it to your system path, do the following:
  - Right-click on This PC and select Properties.
  - Click on Advanced system settings and go to Environment Variables section.
  - Under System variables, select Path variable and click Edit.
  - Add path to the bin folder inside the ffmpeg directory.
  - Click OK to save the changes.
- Verify the installation and re-run the python file.

## Installing and Running the Python Microservices
- CD into each of the microservices: ```AI-assist, classifier, diag-med-pred, firebase-admin, voice-to-text```.
- To install requirements needed to run the python file, the user has to run ```pip install -r requirements.txt```.
- To run the python files, the user has to run ```python.app.py```. 

## Congrats!
Now RapidCare is up and running on your, computer!
